import { NestFactory } from '@nestjs/core';

import * as cors from 'cors';
import { join } from 'path';

import Config from './config/config';
import { AppModule } from './modules/app/app.module';

// tslint:disable-next-line:typedef
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO: enable only on dev
  app.use(cors());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'public', 'client'));
  app.setViewEngine('html');
  await app.listen(Config.port);
}
bootstrap();
