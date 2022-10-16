import { Module } from '@nestjs/common'
import { IonsController } from './ions.controller'
import { IonsService } from './ions.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Ion, IonSchema } from 'schemas/ion.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Ion.name, schema: IonSchema }])],
  controllers: [IonsController],
  providers: [IonsService],
})
export class IonsModule {}
