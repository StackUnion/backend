import { IsOptional, IsString, Length } from 'class-validator'

export class SearchQueryDto {
  @IsString()
  @Length(0, 1024)
  @IsOptional()
  q?: string
}
