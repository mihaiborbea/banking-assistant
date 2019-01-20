import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { User } from 'src/modules/shared/models';
import { UsersService } from 'src/modules/users/services';
import { JwtPayload, UserCredentials } from '../domain/interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  /**
   * check user credentials then construct the payload and sign a token to return
   * @param credentials - user email and password
   */
  public async login(credentials: UserCredentials): Promise<any> {
    const user = await this.validateUserCredentials(credentials);
    if (user) {
      const accessToken = this.jwtService.sign({ _id: user._id, email: user.email, name: user.name });
      return {
        accessToken
      };
    }
  }

  // used in auth guard / jwt strategy
  public async validateUserToken(payload: JwtPayload): Promise<any> {
    const user: User = await this.usersService.retrieveOneByEmail(payload.email);
    const isTokenExpired: boolean = payload.exp > Date.now();
    if (user && !isTokenExpired) {
      return { _id: user._id, email: user.email };
    }
  }

  public async validateUserCredentials(userCrd: UserCredentials): Promise<any> {
    const user: User = await this.usersService.retrieveOneByEmail(userCrd.email);
    const isPasswordValid: boolean = await compare(userCrd.password, user.password);
    if (user && isPasswordValid) {
      return user;
    }
  }
}
