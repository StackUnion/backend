import { Module } from '@nestjs/common'
import { QuantsController } from './quants.controller'
import { QuantsService } from './quants.service'

@Module({
  controllers: [QuantsController],
  providers: [QuantsService],
})
export class QuantsModule {}
