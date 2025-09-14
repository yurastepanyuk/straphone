import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'apps/straphone/src/config';
import { TransactionEntity } from 'apps/billing/src/core/transaction/transaction.entity';
import { AuthTokensGSMEntity } from 'apps/base-station/src/core/auth-tokens-gsm/auth-tokens-gsm.entity';
import { CustomerWebEntity } from 'apps/straphone/src/core/customer-web/customer-web.entity';
import { AuthTokensWebEntity } from 'apps/straphone/src/core/auth-tokens-web/auth-tokens-web.entity';
import { BalanceEntity } from 'apps/billing/src/core/balance/balance.entity';
import { CallEventEntity } from 'apps/billing/src/core/call-event/call-event.entity';
import { DBService } from './db.service';
import { PostgresConfig } from 'apps/straphone/src/config/pg.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [PostgresConfig],
      useFactory: (config: PostgresConfig) => ({
        ...config.createTypeOrmOptions(),
        entities: [
          // CustomerEntity,
          // TariffEntity,
          TransactionEntity,
          AuthTokensGSMEntity,
          CustomerWebEntity,
          AuthTokensWebEntity,
          BalanceEntity,
          CallEventEntity,
        ],
      }),
    }),
  ],
  providers: [DBService],
  exports: [],
})
export class DBModule {}
