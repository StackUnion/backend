import { IsString, Length, Max } from 'class-validator'
import { Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Localized {
  @IsString()
  @Length(2, 5)
  locale: string

  @IsString()
  @Max(1024 * 1024 * 1024 /* 1 Mb */)
  value: string
}

export const LocalizedSchema = SchemaFactory.createForClass(Localized)
