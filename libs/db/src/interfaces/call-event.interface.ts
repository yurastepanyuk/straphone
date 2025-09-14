import { Customer } from '@app/db/interfaces/customer.interface';
import { BaseEntityI } from '@app/db/interfaces/domain.interface';
import { Transaction } from './transaction.interface';

export interface CallEvent extends BaseEntityI {
  customerId: number;
  customer: Customer;
  dateStart: Date;
  dateEnd: Date;
  duration?: number;
  transactions?: Transaction[];
}
