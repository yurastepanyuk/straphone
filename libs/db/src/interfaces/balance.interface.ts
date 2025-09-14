import { Customer } from '@app/db/interfaces/customer.interface';
import { BaseEntityI } from '@app/db/interfaces/domain.interface';

export interface Balance extends BaseEntityI {
  customerId: number;
  balance: number;
  customer: Customer;
}
