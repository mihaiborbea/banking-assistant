import { BadRequestException, Body, Controller, ForbiddenException, Post } from '@nestjs/common';

import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() credentials: any): Promise<any> {
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
