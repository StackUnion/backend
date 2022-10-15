import { Schema as S } from 'mongoose'
import { Prop, Schema } from '@nestjs/mongoose'
import { User } from 'src/schemas/user.schema'

@Schema()
export class Quant {
  @Prop({ required: true })
  title: string

  @Prop({ type: S.Types.ObjectId, ref: 'User' })
  author: User

  @Prop({ required: true })
  createdAt: string

  @Prop()
  content: string
}
