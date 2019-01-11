import { Module } from '@nestjs/common';

import { MCCMapper } from './domain/mappers';
import { MCCService } from './services/mcc-service/mcc-service.service';

@Module({
  providers: [MCCService, MCCMapper]
})
export class TransactionsModule {}
