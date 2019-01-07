import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { inspect } from 'util';

import Config, { DBConfig } from 'src/config/config';

const DBConfig: DBConfig = Config.db;
const DBCredentials: string = DBConfig.password
  ? `${DBConfig.username}:${DBConfig.password}@`
  : '';
const DBConnectionURI: string = `mongodb://${DBCredentials}
                                ${DBConfig.host}:${DBConfig.port}
                                /${DBConfig.database}`;
const logger = new Logger('Database');

export const DatabaseProviders = [
  {
    provide: 'DBConnectionToken',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        logger.log(`Connecting to MongoDB...`);
        const connection = await mongoose.connect(
          DBConnectionURI,
          { useNewUrlParser: true }
        );
        mongoose.set('debug', (coll, method, query, doc, options) => {
          logger.log(`${coll}.${method}(${inspect(query)})`);
        });
        return connection;
      } catch (error) {
        logger.error(`Failed to connect to MongoDb.\nError:\n ${error}`);
      } finally {
        logger.log(`Connected to MongoDB!`);
      }
    }
  }
];
