import { Customer } from '@app/db/interfaces/customer.interface';
import { BaseEntityI } from './domain.interface';
import { AuthTokensWeb } from './auth-tokens-web.interface';

export interface CustomerWeb extends BaseEntityI {
  name: string;
  pass: string;
  customer: Customer;
  authTokens?: AuthTokensWeb[];
}
