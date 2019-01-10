import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/modules/shared/models';
import { UsersService } from 'src/modules/users/services';
import { JwtPayload, JwtToken, UserCredentials } from '../domain/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService
  ) {}

  /**
   * check user credentials then construct the payload and sign a token to return
   * @param credentials - user email and password
   */
  public async login(credentials: UserCredentials): Promise<JwtToken> {
    const validUser = await this.validateUserCredentials(credentials);
    if (validUser) {
      const accessToken = this.jwtService.sign({ email: credentials.email });
      return {
        accessToken
      };
    }
  }

  // used in auth guard / jwt strategy
  // TODO: check for expiration
  public async validateUserToken(payload: JwtPayload): Promise<any> {
    const user: User = await this.usersService.retrieveOneByEmail(
      payload.email
    );
    if (user) {
      return { email: user.email };
    }
  }

  public async validateUserCredentials(userCrd: UserCredentials): Promise<any> {
    const user: User = await this.usersService.retrieveOneByEmailAndPassword(
      userCrd.email,
      userCrd.password
    );
    return user;
  }
}
