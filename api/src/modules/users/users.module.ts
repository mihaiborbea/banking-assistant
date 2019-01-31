import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UsersController } from './controllers/';
import { AmountsMapper, UsersMapper } from './domain/mappers';
import { ChatService, UsersService } from './services/';

@Module({
  imports: [AuthModule],
  providers: [UsersService, UsersMapper, ChatService, AmountsMapper],
  controllers: [UsersController]
})
export class UsersModule {}
