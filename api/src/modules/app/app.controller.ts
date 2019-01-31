import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  @Get()
  public root(@Res() response: Response): void {
    // the homepage will load our index.html which contains angular logic
    response.sendFile(path.resolve('../dist/client/index.html'));
  }
}
