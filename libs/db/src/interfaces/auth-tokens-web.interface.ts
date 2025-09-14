import { BaseEntityI } from './domain.interface';
import { CustomerWebEntity } from '../../../../apps/straphone/src/core/customer-web/customer-web.entity';

export interface AuthTokensWeb extends BaseEntityI {
  customerWebId: number;
  session: string;
  expired: Date;
  payload?: Record<string, any>;
  customerWeb?: CustomerWebEntity;
}
