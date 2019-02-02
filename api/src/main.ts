import { NestFactory } from '@nestjs/core';

import * as cors from 'cors';
import { join } from 'path';

import Config from './config/config';
import { AppModule } from './modules/app/app.module';
import { frontendMiddleware } from './modules/app/frontend.middleware';

// tslint:disable-next-line:typedef
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(frontendMiddleware);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'public', 'client'));
  app.useStaticAssets(join(__dirname, '..', 'public', 'uploads'));
  await app.listen(Config.port);
}
bootstrap();
