import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DBConfigStatic implements TypeOrmOptionsFactory {
  private readonly type = 'postgres';
  private readonly host = 'localhost';
  private readonly port = 5432;
  private readonly username = 'postgres';
  private readonly password = undefined;
  private readonly database = 'straphone';
  private readonly synchronize = true;
  private readonly entities = [__dirname + '/../**/*.entity{.ts,.js}'];
  private readonly migrations = [__dirname + '/../migrations/**/*{.ts,.js}'];
  private readonly logging = true;
  private readonly extra = {
    max: 5,
    min: 1,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.type,
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      synchronize: this.synchronize,
      entities: this.entities,
      migrations: this.migrations,
      logging: this.logging,
      extra: this.extra,
      // Додаткові опції для Postgres: наприклад, schema: 'public' або ssl: true для захищеного з'єднання
    };
  }
}
