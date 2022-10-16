import { PaginationDto } from 'dto/Pagination.dto'
import { IntersectionType } from '@nestjs/mapped-types'
import { SearchQueryDto } from 'dto/SearchQuery.dto'

export class SearchDto extends IntersectionType(PaginationDto, SearchQueryDto) {}
