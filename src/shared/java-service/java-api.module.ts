import { Module } from '@nestjs/common';
import { JavaApiService } from './java-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [JavaApiService],
  imports: [HttpModule],
})
export class JavaApiModule {}
