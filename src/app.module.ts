import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { QuantsModule } from './modules/quants/quants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      cache: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    QuantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
