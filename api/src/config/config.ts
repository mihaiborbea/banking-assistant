export interface DBConfig {
  database: string;
  host: string;
  port: string;
  username: string;
  password: string;
}

export interface IConfig {
  db: DBConfig;
  enableHttpRequestLogging: boolean;
  host: string;
  port: number;
  serveStatic: boolean;
  serviceName: string;
  debug: boolean;
}

const Config: IConfig = {
  db: {
    database: process.env.MONGODB_DATABASE || 'api-data',
    host: process.env.MONGODB_HOST || 'mongo',
    password: process.env.MONGODB_PASSWORD || '',
    port: process.env.MONGODB_PORT || '27017',
    username: process.env.MONGODB_USERNAME || 'root'
  },
  debug: true,
  enableHttpRequestLogging: true,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  serveStatic: true,
  serviceName: process.env.SERVICE_NAME || 'app',
};

export default Config;
