import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get
} from '@nestjs/common';

import { JwtToken } from '../domain/interfaces';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  public async login(@Body() credentials: any): Promise<JwtToken> {
    if (!credentials) {
      throw new BadRequestException('No credentials');
    }
    const token = await this.authService.login(credentials);
    if (!token) {
      throw new ForbiddenException('Invalid credentials');
    }
    return token;
  }
}
