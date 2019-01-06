import { Module } from '@nestjs/common';

import { UsersController } from './controllers/';
import { UsersService } from './services/';
import { UsersMapper } from './domain/mappers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ AuthModule ],
  providers:[UsersService, UsersMapper],
  controllers:[UsersController]
})
export class UsersModule {}
