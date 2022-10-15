import { Prop, Schema } from '@nestjs/mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: true })
  uid: string

  @Prop({ required: true })
  nid: string

  @Prop({ required: true })
  password: string

  @Prop()
  display: string

  @Prop({ required: true })
  createdAt: string
}
