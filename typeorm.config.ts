import 'dotenv/config';
import { DbConfig } from 'apps/straphone/src/config';
// import { DbConfig } from 'src/config';
import { DataSource } from 'typeorm';

// import { DbConfig } from './src/config';

const config = new DbConfig().getConfig();

export default new DataSource({
  ...config,
  entities: ['apps/**/**/**/**/*.entity.ts'],
  migrations: ['migrations/*.*'],
  synchronize: false,
  logging: true,
  extra: {
    max: 5,
    min: 1,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
});
