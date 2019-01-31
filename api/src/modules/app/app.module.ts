import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { FrontendMiddleware } from './services/frontend.middleware';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(FrontendMiddleware).forRoutes({
      path: '/**', // For all routes
      method: RequestMethod.ALL // For all methods
    });
  }
}
