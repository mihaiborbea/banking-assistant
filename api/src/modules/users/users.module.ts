import { Module } from '@nestjs/common';

import { UsersController } from './controllers/';
import { UsersService } from './services/';
import { UsersMapper } from './domain/mappers';

@Module({
  providers:[UsersService, UsersMapper],
  controllers:[UsersController]
})
export class UsersModule {}
