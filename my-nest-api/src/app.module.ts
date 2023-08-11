import { DatabaseModule } from './database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule,ConfigModule.forRoot({
    isGlobal : true
  }),], // Configuration globale du module Config
  controllers: [],
  providers: [],
})
export class AppModule {}
