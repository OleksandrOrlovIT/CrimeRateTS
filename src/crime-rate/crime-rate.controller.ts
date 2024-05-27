import { Body, Controller, Get, Injectable, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCrimeRateDto } from './dto/createCrimeRateDto';
import { CrimeRateService } from './crime-rate.service';

@Controller('api/crime-rate')
export class CrimeRateController {
    constructor(
        private readonly crimeRateService: CrimeRateService,
    ) {}

    @Post('/')
    @UsePipes(new ValidationPipe())
    public async createCrimeRate(@Body() createCrimeRateDto: CreateCrimeRateDto) {
        const createdCrimeRate = await this.crimeRateService.createCrimeRate(createCrimeRateDto);
        return { id: createdCrimeRate._id };
    }
}