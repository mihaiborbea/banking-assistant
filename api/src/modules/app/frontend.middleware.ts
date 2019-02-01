import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import * as path from 'path';

const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg', '.json'];

const resolvePath = (file: string) => path.resolve(__dirname, '..', '..', '..', 'public', 'client', file);

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  public resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      const { url } = req;
      console.log(url);
      if (url.indexOf('api') === 1) {
        // it starts with /api --> continue with execution
        next();
      } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
        // it has a file extension --> resolve the file
        res.sendFile(resolvePath(url));
      } else {
        // in all other cases, redirect to the index.html!
        res.sendFile(resolvePath('index.html'));
      }
    };
  }
}

export function frontendMiddleware(req: any, res: any, next: any): any {
  console.log(`Frontend middleware...`);
  const { url } = req;
  console.log(url);
  if (url.indexOf('api') === 1) {
    console.log('here');
    // it starts with /api --> continue with execution
    next();
  } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
    // it has a file extension --> resolve the file
    console.log('there');
    res.sendFile(resolvePath(url));
  } else {
    console.log('final');
    // in all other cases, redirect to the index.html!
    res.sendFile(resolvePath('index.html'));
  }
}
