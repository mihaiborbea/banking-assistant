import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private appService: AppService);
  // @Get()
  // public getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  public root(@Res() response: Response): void {
    // the homepage will load our index.html which contains angular logic
    response.sendFile(path.resolve('..', '/dist/index.html'));
  }
}
