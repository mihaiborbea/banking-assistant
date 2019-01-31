import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AppController]
})
export class AppModule {}
