import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import Config from 'src/config/config';
import { UsersMapper } from '../users/domain/mappers';
import { UsersService } from '../users/services';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { JwtStrategy } from './services';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(Config.auth)
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, UsersMapper],
  exports: [PassportModule]
})
export class AuthModule {}
