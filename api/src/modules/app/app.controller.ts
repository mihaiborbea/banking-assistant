import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  @Get()
  public root(@Res() response: Response): void {
    console.log(path.resolve(__dirname, '..', '..', '..', 'dist', 'public', 'client', 'index.html'));
    // the homepage will load our index.html which contains angular logic
    response.sendFile(path.resolve(__dirname, '..', '..', '..', 'dist', 'public', 'client', 'index.html'));
  }
}
