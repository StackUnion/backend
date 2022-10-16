import { IsInt, IsOptional, IsString, Length, Matches, Max, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class PaginationDto {
  @IsInt()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  limit = 20

  @IsInt()
  @Min(0)
  @Max(1e6)
  @Type(() => Number)
  page = 0

  @IsString()
  @Matches(/^-?\w+$/)
  @Length(2, 32)
  @IsOptional()
  sort?: string
}
