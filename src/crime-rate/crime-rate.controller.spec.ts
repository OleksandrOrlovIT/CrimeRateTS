import { Test, TestingModule } from '@nestjs/testing';
import { CrimeRateController } from './crime-rate.controller';
import { CrimeRateService } from './crime-rate.service';

const crimeRateServiceStub = {};

describe('CrimeRateController', () => {
  let controller: CrimeRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrimeRateController],
      providers: [
        {
          provide: CrimeRateService,
          useValue: crimeRateServiceStub,
        },
      ],
    }).compile();

    controller = module.get<CrimeRateController>(CrimeRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
