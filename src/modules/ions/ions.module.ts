import { Module } from '@nestjs/common'
import { IonsController } from './ions.controller'
import { IonsService } from './ions.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Ion, IonSchema } from 'schemas/ion.schema'
import { IonController } from 'modules/ions/ion.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: Ion.name, schema: IonSchema }])],
  controllers: [IonsController, IonController],
  providers: [IonsService],
})
export class IonsModule {}
