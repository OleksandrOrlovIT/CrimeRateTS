import { Module } from '@nestjs/common';
import { CrimeRateController } from './crime-rate.controller';
import { CrimeRateService } from './crime-rate.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CrimeRate, CrimeRateSchema } from './crime-rate.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CrimeRate.name, schema: CrimeRateSchema },
    ]),
    HttpModule,
  ],
  controllers: [CrimeRateController],
  providers: [CrimeRateService],
})
export class CrimeRateModule {
}