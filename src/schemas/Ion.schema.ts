import { Model, Schema as S } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from './user.schema'
import { Localized, LocalizedSchema } from './Localized.schema'
import { CodeEmbed, CodeEmbedSchema } from './CodeEmbed.schema'

@Schema()
export class Ion {
  @Prop({ required: true })
  uid: string

  @Prop({ type: [LocalizedSchema], required: true })
  title: Localized[]

  @Prop({ type: S.Types.ObjectId, ref: 'User' })
  author: User

  @Prop({ required: true })
  createdAt: Date

  @Prop({ type: [LocalizedSchema] })
  content: Localized[]

  @Prop({ required: true, type: [String], default: [] })
  keywords: string[]

  @Prop({ type: [CodeEmbedSchema] })
  embeds: CodeEmbed[]
}

export type IonDocument = Ion & Document
export const IonSchema = SchemaFactory.createForClass(Ion)
export type IonModel = Model<IonDocument>
