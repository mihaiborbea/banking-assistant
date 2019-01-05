import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

import Config from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Config.port);
}
bootstrap();
