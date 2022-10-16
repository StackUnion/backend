import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { IonsModule } from 'modules/ions/ions.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      cache: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI, { dbName: 'stackunion' }),
    IonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
