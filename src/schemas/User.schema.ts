import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Model } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: true })
  uid: string

  @Prop({ required: true })
  nid: string

  @Prop({ required: true, select: false })
  password: string

  @Prop()
  display: string

  @Prop({ required: true })
  createdAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
export type UserModel = Model<UserDocument>
