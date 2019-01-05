
import * as mongoose from 'mongoose';
import { Logger } from '@nestjs/common'

import Config, { DBConfig } from 'src/config/config';

const DBConfig: DBConfig = Config.db;
const DBCredentials: string = DBConfig.password ? `${DBConfig.username}:${DBConfig.password}@` : '';
const DBConnectionURI: string = `mongodb://${DBCredentials}${DBConfig.host}:${DBConfig.port}/${DBConfig.database}`
const logger = new Logger('DatabaseModule');

export const DatabaseProviders = [
  {
    provide: 'DBConnectionToken',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        logger.log(`Connecting to MongoDB...`)
        await mongoose.connect(DBConnectionURI, { useNewUrlParser: true })
        logger.log(`Connected to MongoDB!`);
      } catch (error) {
        logger.error(`Failed to connect to MongoDb.\nError:\n ${error}`);
      }
    }
  },
];