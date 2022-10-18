import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class CodeTab {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  value: string
}

export const CodeTabSchema = SchemaFactory.createForClass(CodeTab)
