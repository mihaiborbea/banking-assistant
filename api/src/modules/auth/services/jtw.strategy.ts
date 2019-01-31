import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '.';
import Config from '../../../config/config';
import { JwtPayload } from '../domain/interfaces/';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Config.auth.secretOrPrivateKey
    });
  }

  // Used by AuthGuard('jwt')
  public async validate(payload: JwtPayload): Promise<any> {
    const user = await this.authService.validateUserToken(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
