import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../domain/interfaces/';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  public async login() {
    // check user credentials then construct the payload and sign a token to return
    const user: JwtPayload = { email: 'test@email.com' };
    const accessToken = this.jwtService.sign(user);
    return {
      accessToken,
    };
  }

  // used in other areas of auth module, NOT login
  public async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    return {};
  }
}