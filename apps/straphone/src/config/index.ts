import { Injectable } from '@nestjs/common';
import { ConfigBase } from './config.base';
import { PostgresConfig } from './pg.config';

export { DBConfigStatic } from './db.config';
export { ConfigModule } from './config.module';

@Injectable()
export class DbConfig extends ConfigBase {
  // private dbType = this.asString('DB_TYPE');

  public getConfig(): PostgresConfig {
    return new PostgresConfig();
  }
}
