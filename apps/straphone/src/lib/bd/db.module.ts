import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from '../../config/pg.config';
import { CustomerEntity } from '../../core/entities/customer.entity';
import { TariffEntity } from '../../core/entities/tariff.entity';
import { TransactionEntity } from '../../core/entities/transaction.entity';
import { ConfigModule } from '../../config';
import { AuthTokensGSMEntity } from '../../core/entities/auth-tokens-gsm.entity';
import { CustomerWebEntity } from '../../core/entities/customer-web.entity';
import { AuthTokensWebEntity } from '../../core/entities/auth-tokens-web.entity';
import { BalanceEntity } from '../../core/entities/balance.entity';
import { CallEventEntity } from '../../core/entities/call-event.entity';
// import { DBConfigStatic } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [PostgresConfig],
      useFactory: (config: PostgresConfig) => ({
        ...config.createTypeOrmOptions(),
        entities: [
          CustomerEntity,
          TariffEntity,
          TransactionEntity,
          AuthTokensGSMEntity,
          CustomerWebEntity,
          AuthTokensWebEntity,
          BalanceEntity,
          CallEventEntity,
          CustomerWebEntity,
        ],
      }),
    }),
  ],
})
export class DBModule {}
