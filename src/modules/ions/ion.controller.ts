import { Controller, Get, HttpException, Param } from '@nestjs/common'
import { IonsService } from 'modules/ions/ions.service'

@Controller('ion')
export class IonController {
  constructor(private readonly ionsService: IonsService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    const result =
      (await this.ionsService.getById(id)) ?? (await this.ionsService.search({ q: id, limit: 1, page: 0 })).items[0]
    if (!result) throw new HttpException('not_found', 404)
    return result
  }
}
