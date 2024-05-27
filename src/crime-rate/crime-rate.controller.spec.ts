import { Test, TestingModule } from '@nestjs/testing';
import { CrimeRateController } from './crime-rate.controller';

describe('CrimeRateController', () => {
    let controller: CrimeRateController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CrimeRateController],
        }).compile();

        controller = module.get<CrimeRateController>(CrimeRateController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});