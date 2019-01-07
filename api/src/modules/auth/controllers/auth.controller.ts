import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  public async login(): Promise<any> {
    return await this.authService.login();
  }
}
