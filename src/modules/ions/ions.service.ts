import { Injectable } from '@nestjs/common'
import { SearchDto } from '../../dto/Search.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Ion, IonDocument, IonModel } from '../../schemas/Ion.schema'
import { SearchQueryDto } from '../../dto/SearchQuery.dto'

@Injectable()
export class IonsService {
  constructor(@InjectModel(Ion.name) private ionModel: IonModel) {}

  async search(params: SearchDto) {
    const [, ktype, keywordset, nextQuery] = params?.q?.match(/^keywords([:=])(\S+)\s?(.*)/) ?? []

    const findPath = ['content.value', 'title.value', 'keywords']

    const searchOptions = {
      text: {
        path: findPath,
        query: nextQuery?.length > 0 ? nextQuery : params.q,
        fuzzy: {
          maxEdits: 2,
        },
      },
      highlight: { path: findPath },
    }

    const createQuery = () => {
      const query = this.ionModel.aggregate()
      if ((params.q && !keywordset) || nextQuery?.length > 0) query.search(searchOptions)
      return query
    }
    const count = (<unknown>await createQuery().count('count').exec())?.[0]?.count ?? 0
    const query = createQuery()
    query
      .skip(params.page * params.limit)
      .limit(params.limit)
      .project({
        _id: 0,
        uid: 1,
        title: 1,
        createdAt: 1,
        content: 1,
        keywords: 1,
        author: 1,
        highlights: { $meta: 'searchHighlights' },
      })
    if (params.sort) query.sort(params.sort)
    if (keywordset) {
      const keywords = keywordset.trim().split(',')
      query.match({ keywords: ktype === '=' ? { $all: keywords } : { $in: keywords } })
    }
    return {
      count,
      items: (await this.ionModel.populate(await query.exec(), {
        path: 'author',
        select: '-_id',
      })) as IonDocument[],
    }
  }

  async autocomplete(params: SearchQueryDto) {
    return this.ionModel
      .aggregate()
      .search({
        index: 'autocomplete',
        embeddedDocument: {
          path: 'title',
          operator: {
            autocomplete: {
              path: 'title.value',
              query: params.q,
              fuzzy: {
                maxEdits: 2,
              },
            },
          },
        },
      })
      .limit(10)
      .project({
        _id: 0,
        uid: 1,
        title: 1,
        score: { $meta: 'searchScore' },
      })
      .exec()
  }

  async getById(uid: string) {
    return this.ionModel.findOne({ uid }).populate('author', '-_id')
  }

  async getAllids() {
    return this.ionModel.find({}).then(v => v.map(i => i.uid))
  }
}
