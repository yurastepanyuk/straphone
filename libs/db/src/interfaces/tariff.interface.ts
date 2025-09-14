import { BaseEntityI } from '@app/db/interfaces/domain.interface';
import { Customer } from '@app/db/interfaces/customer.interface';
import { Transaction } from './transaction.interface';

export interface Tariff extends BaseEntityI {
  name: string;
  cost: number;
  freeMinuteMounth: number;
  customers: Customer[];
  transactions: Transaction[];
}
