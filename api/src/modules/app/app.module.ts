import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [DatabaseModule, UsersModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
