import { Controller, Get, Query, Response } from '@nestjs/common'
import { SearchDto } from '../../dto/Search.dto'
import { IonsService } from './ions.service'
import { Response as Res } from 'express'
import { SearchQueryDto } from '../../dto/SearchQuery.dto'

@Controller('ions')
export class IonsController {
  constructor(private readonly ionsService: IonsService) {}

  @Get()
  async search(@Query() searchDto: SearchDto, @Response() res: Res) {
    const { count, items } = await this.ionsService.search(searchDto)
    res.header('X-Total-Count', count).json(items)
  }

  @Get('autocomplete')
  async autocomplete(@Query() query: SearchQueryDto) {
    return this.ionsService.autocomplete(query)
  }

  @Get('map')
  async map() {
    return this.ionsService.getAllids()
  }
}
