import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UsersMapper } from './domain/mappers';

@Module({
  providers:[UsersService, UsersMapper],
  controllers:[UsersController]
})
export class UsersModule {}
