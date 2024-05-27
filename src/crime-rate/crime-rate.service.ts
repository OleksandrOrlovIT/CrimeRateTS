import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCrimeRateDto } from './dto/createCrimeRateDto';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { CrimeRate, CrimeRateDocument } from './crime-rate.schema';
import { Model } from 'mongoose';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CrimeRateService {
    constructor(
        private readonly httpService: HttpService,
        @InjectModel(CrimeRate.name) private crimeRateModel: Model<CrimeRateDocument>,
    ) {}

    public async createCrimeRate(payload: CreateCrimeRateDto): Promise<CrimeRateDocument> {
        try {
            const response: AxiosResponse = await lastValueFrom(
                this.httpService.get(`http://localhost:8080/api/city/${payload.cityId}`)
            );

            const city = response.data;

            if (!city) {
                throw new BadRequestException(`City with id ${payload.cityId} was not found.`);
            }

            console.log("city is = ", JSON.stringify(city, null, 2));

            const newCrimeRate = new this.crimeRateModel({
                cityId: payload.cityId,
                crimeIndex: payload.crimeIndex,
                safetyIndex: payload.safetyIndex,
                concludedAt: payload.concludedAt,
            });

            return await newCrimeRate.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException('A record with the same cityId, crimeIndex, safetyIndex, and concludedAt already exists.');
            }
            if (error.response && error.response.status === 404) {
                throw new BadRequestException(`City with id ${payload.cityId} was not found.`);
            }
            throw error;
        }
    }
}