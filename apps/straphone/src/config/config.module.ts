import { Module } from '@nestjs/common';
import { DBConfigStatic } from './db.config';
import { PostgresConfig } from './pg.config';

const providers = [DBConfigStatic, PostgresConfig];

@Module({
  providers,
  exports: [DBConfigStatic, PostgresConfig],
})
export class ConfigModule {}
