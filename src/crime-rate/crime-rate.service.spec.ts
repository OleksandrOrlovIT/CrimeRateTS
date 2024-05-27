import { Test, TestingModule } from '@nestjs/testing';
import { CrimeRateService } from './crime-rate.service';

describe('CrimeRateService', () => {
    let service: CrimeRateService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CrimeRateService],
        }).compile();

        service = module.get<CrimeRateService>(CrimeRateService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});