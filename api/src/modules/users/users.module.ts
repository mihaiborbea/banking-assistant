import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UsersController } from './controllers/';
import { UsersMapper } from './domain/mappers';
import { UsersService } from './services/';

@Module({
  imports: [AuthModule],
  providers: [UsersService, UsersMapper],
  controllers: [UsersController]
})
export class UsersModule {}
