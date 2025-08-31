import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ConfigBase } from './config.base';

export class DbConfigBase extends ConfigBase {
  @IsBoolean()
  public readonly autoLoadEntities = true;

  @IsBoolean()
  public readonly keepConnectionAlive = true;

  @IsInt()
  public readonly poolSize = 10;

  @IsInt()
  @IsPositive()
  public readonly maxQueryExecutionTime =
    this.asNumber('DB_SLOW_QUERY_MS') ?? 100;

  @IsString()
  public readonly database = this.asString('DB_NAME') ?? 'straphone';

  @IsString()
  public readonly host = this.asString('DB_HOST') ?? 'localhost';

  @IsInt()
  @IsPositive()
  @IsOptional()
  public readonly port = this.asNumber('DB_PORT') ?? 5432;

  @IsString()
  public readonly username = this.asString('DB_USER') ?? 'postgres';

  @IsString()
  public readonly password = this.asString('DB_PASS') ?? '';

  @IsBoolean()
  public readonly logging = this.asBoolean('DB_LOGGING') ?? false;

  @IsBoolean()
  public readonly synchronize = this.asBoolean('DB_SYNCHRONIZE') ?? false;

  @IsInt()
  @IsPositive()
  @IsOptional()
  public readonly retryAttempts = this.asNumber('DB_RETRY_ATTEMPTS');

  @IsInt()
  @IsPositive()
  @IsOptional()
  public readonly retryDelay = this.asNumber('DB_RETRY_DELAY');
}
