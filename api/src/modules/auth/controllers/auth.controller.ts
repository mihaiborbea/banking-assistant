import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../services';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  public async login(): Promise<any> {
    return await this.authService.login();
  }

  @Get('users')
  @UseGuards(AuthGuard())
  findAll() {
    return [];
  }
}
