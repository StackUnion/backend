import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { CodeTab, CodeTabSchema } from './CodeTab.schema'

@Schema()
export class CodeEmbed {
  @Prop({ required: true })
  eid: string

  @Prop({ required: true, type: [CodeTabSchema], default: [] })
  tabs: CodeTab[]
}

export const CodeEmbedSchema = SchemaFactory.createForClass(CodeEmbed)
