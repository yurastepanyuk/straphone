import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DbConfigBase } from './db.config.base';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IsString } from 'class-validator';

export class PostgresConfig
  extends DbConfigBase
  implements PostgresConnectionOptions
{
  @IsString()
  public readonly type = 'postgres';

  // entities: [CustomerEntity, TariffEntity, TransactionEntity];

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(
      'PostgresConfig: Creating TypeORM options',
      JSON.stringify(this),
    );

    return {
      type: this.type,
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      logging: this.logging,
      synchronize: this.synchronize,
      autoLoadEntities: this.autoLoadEntities,
      retryAttempts: this.retryAttempts,
      poolSize: this.poolSize,
    };
  }
}
