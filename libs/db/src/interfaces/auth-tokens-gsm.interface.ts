import { BaseEntityI } from '@app/db/interfaces/domain.interface';
import { Customer } from './customer.interface';

export interface AuthTokensGSM extends BaseEntityI {
  customerId: number;
  session: string;
  expired: Date;
  payload?: Record<string, any>;
  customer: Customer;
}
