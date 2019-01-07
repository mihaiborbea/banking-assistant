import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import Config from 'src/config/config';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { JwtStrategy } from './services';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(Config.auth)
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule]
})
export class AuthModule {}
