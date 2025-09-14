import { BalanceEntity } from 'apps/billing/src/core/balance/balance.entity';
import { CustomerWebEntity } from 'apps/straphone/src/core/customer-web/customer-web.entity';
import { BaseEntityI } from '@app/db/interfaces/domain.interface';
import { Tariff } from '@app/db/interfaces/tariff.interface';
import { CallEvent } from '@app/db/interfaces/call-event.interface';
import { Transaction } from '@app/db/interfaces/transaction.interface';
import { AuthTokensGSM } from './auth-tokens-gsm.interface';

export interface Customer extends BaseEntityI {
  phoneNumber: string;
  tariffId: number;
  imsi: string;
  active: boolean;
  tariff: Tariff;
  balance?: BalanceEntity;
  customerWeb?: CustomerWebEntity;
  authTokens?: AuthTokensGSM[];
  callEvents: CallEvent[];
  transactions: Transaction[];
}
