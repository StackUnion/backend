import { PaginationDto } from './Pagination.dto'
import { IntersectionType } from '@nestjs/mapped-types'
import { SearchQueryDto } from './SearchQuery.dto'

export class SearchDto extends IntersectionType(PaginationDto, SearchQueryDto) {}
