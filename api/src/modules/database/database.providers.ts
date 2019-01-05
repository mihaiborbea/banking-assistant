
import * as mongoose from 'mongoose';

import Config, { DBConfig } from 'src/config/config';

const DBConfig: DBConfig = Config.db;
const DBCredentials: string = DBConfig.password ? `${DBConfig.username}:${DBConfig.password}@` : '';
const DBConnectionURI: string = `mongodb://${DBCredentials}${DBConfig.host}:${DBConfig.port}/${DBConfig.database}`

export const DatabaseProviders = [
  {
    provide: 'DBConnectionToken',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        console.log(`Connecting to MongoDB on ${DBConfig.host}:${DBConfig.port}...`)
        await mongoose.connect(DBConnectionURI, { useNewUrlParser: true })
        console.log(`Connected to MongoDB!`);
      } catch (error) {
        console.log(`Failed to connect to MongoDb.\nError:\n ${error}`);
      }
    }
  },
];