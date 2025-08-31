import { validateSync } from 'class-validator';

import { ErrorBase } from '../errors/error.base';
import { log } from 'console';

export class ConfigBase {
  public constructor() {
    setImmediate(() => {
      this.validate();
    });
  }

  public get env(): Record<string, string | undefined> {
    log('ConfigBase: Accessing environment variables');
    return process.env;
  }

  public asNumber(envName: string): number | undefined {
    log(`ConfigBase: Getting number for ${envName}`);
    const env = this.env[envName];
    log(`ConfigBase: Value for ${envName} is ${env}`);

    return env ? Number(env) : undefined;
  }

  public asString(envName: string): string | undefined {
    log(`ConfigBase: Getting string for ${envName}`);
    log(`ConfigBase: Value for ${envName} is ${this.env[envName]}`);
    return this.env[envName];
  }

  public asBoolean(envName: string): boolean | undefined {
    log(`ConfigBase: Getting boolean for ${envName}`);
    const value = this.asString(envName);
    log(`ConfigBase: Value for ${envName} is ${value}`);

    return value && ['true', 'false'].includes(value)
      ? value === 'true'
      : undefined;
  }

  public asArray(envName: string): string[] | undefined {
    log(`ConfigBase: Getting array for ${envName}`);
    return this.env[envName] ? this.env[envName].split(',') : undefined;
  }

  protected validate(): void {
    // const errors: unknown[] = validateSync(this);
    const errors = validateSync(this, {
      forbidUnknownValues: false, // Вимкни строгу перевірку на unknown
      skipMissingProperties: true, // Ігноруй missing/undefined props
      validationError: { target: false }, // Не показуй target в помилках
    });

    if (!errors.length) {
      return;
    }

    throw new ErrorBase(`Invalid configuration: ${errors.join('\n')}`);
  }
}
