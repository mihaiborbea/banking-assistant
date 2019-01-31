import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { inspect } from 'util';

import Config, { DBConfig } from '../../config/config';

const DBConfig: DBConfig = Config.db;
const DBProtocol: string = DBConfig.location === 'atlas' ? 'mongodb+srv://' : 'mongodb://';
const DBCredentials: string = DBConfig.password ? `${DBConfig.username}:${DBConfig.password}@` : '';
const DBConnectionURI: string = `${DBProtocol}${DBCredentials}${DBConfig.host}${
  DBConfig.port ? ':' + DBConfig.port : ''
}/${DBConfig.database}${DBConfig.location === 'atlas' ? '?retryWrites=true' : ''}`;
const logger = new Logger('Database');

export const DatabaseProviders = [
  {
    provide: 'DBConnectionToken',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        logger.log(`Connecting to MongoDB...`);
        logger.log(`${DBConnectionURI}`);
        const connection = await mongoose.connect(DBConnectionURI, { useNewUrlParser: true });
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
