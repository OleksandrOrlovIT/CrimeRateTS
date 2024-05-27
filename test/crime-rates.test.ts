import { expect } from 'chai';
import sinon from 'sinon';
import { AxiosResponse } from 'axios';
import { BadRequestException } from '@nestjs/common';
import { CrimeRateService } from '../src/crime-rate/crime-rate.service';

describe('CrimeRateService', () => {
  let crimeRateService: CrimeRateService;
  let httpServiceMock: any;

  beforeEach(() => {
    httpServiceMock = {
      get: sinon.stub(),
    };

    crimeRateService = new CrimeRateService(httpServiceMock, {} as any);
  });

  it('should create a crime rate', async () => {
    // Mocked payload
    const payload = {
      cityId: 123,
      crimeIndex: 5,
      safetyIndex: 8,
      concludedAt: new Date(),
    };

    const responseData = {
      id: 123,
      name: 'Mock City',
    };

    httpServiceMock.get.resolves({ data: responseData } as AxiosResponse);

    const saveStub = sinon.stub().resolves({ _id: 'mocked_id' });
    const crimeRateModelMock: any = {
      findOne: sinon.stub().returnsThis(),
      save: saveStub,
    };

    crimeRateService['crimeRateModel'] = crimeRateModelMock;

    const result = await crimeRateService.createCrimeRate(payload);

    expect(result).to.have.property('_id').that.equals('mocked_id');
    sinon.assert.calledWith(
      httpServiceMock.get,
      `http://localhost:8080/api/city/${payload.cityId}`,
    );
    sinon.assert.calledOnce(saveStub);
  });

  it('should throw BadRequestException if city is not found', async () => {
    const payload = {
      cityId: 123,
      crimeIndex: 5,
      safetyIndex: 8,
      concludedAt: new Date(),
    };

    httpServiceMock.get.resolves({ data: null } as AxiosResponse);

    await expect(crimeRateService.createCrimeRate(payload)).to.be.rejectedWith(
      BadRequestException,
    );
  });
});
