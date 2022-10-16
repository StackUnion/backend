import { Injectable } from '@nestjs/common'
import { SearchDto } from 'dto/Search.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Ion, IonDocument, IonModel } from 'schemas/ion.schema'
import { SearchQueryDto } from 'dto/SearchQuery.dto'

@Injectable()
export class IonsService {
  constructor(@InjectModel(Ion.name) private ionModel: IonModel) {}

  async search(params: SearchDto) {
    const searchOptions = {
      text: {
        path: ['content.value', 'title.value', 'keywords'],
        query: params.q,
        fuzzy: {
          maxEdits: 2,
        },
      },
      highlight: { path: ['content.value', 'title.value', 'keywords'] },
    }
    const createQuery = () => {
      const query = this.ionModel.aggregate()
      if (params.q) query.search(searchOptions)
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
        highlights: { $meta: 'searchHighlights' },
      })
    if (params.sort) query.sort(params.sort)
    return {
      count,
      items: (await query.exec()) as IonDocument[],
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
}
