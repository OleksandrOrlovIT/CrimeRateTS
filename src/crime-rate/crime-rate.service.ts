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

    public async getCrimeRates(cityId: number, size: number = 10, from: number = 0): Promise<CrimeRateDocument[]> {
        if (!cityId) {
            throw new BadRequestException('cityId is required.');
        }
        if(size <= 0){
            throw new BadRequestException('size has to be more then 0.');
        }
        if(from < 0){
            throw new BadRequestException('from has to be more or equal 0.');
        }

        return await this.crimeRateModel
            .find({ cityId })
            .sort({ concludedAt: -1 })
            .skip(from)
            .limit(size)
            .exec();
    }

    public async getCrimeRatesCount(cityIds: number[]): Promise<{ [key: number]: number }> {
        if (!Array.isArray(cityIds)) {
            throw new BadRequestException('You have to add cityIds array in your request body');
        }

        const crimeRatesCount = await this.crimeRateModel.aggregate([
            { $match: { cityId: { $in: cityIds } } },
            { $group: { _id: "$cityId", count: { $sum: 1 } } },
            { $project: { _id: 0, cityId: "$_id", count: 1 } }
        ]);

        const result = {};
        crimeRatesCount.forEach((entry) => {
            result[entry.cityId] = entry.count;
        });

        return result;
    }
}