import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CrimeRateModule } from './crime-rate/crime-rate.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/crime-rate'), CrimeRateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
