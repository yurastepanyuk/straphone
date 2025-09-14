import { Customer } from '@app/db/interfaces/customer.interface';
import { BaseEntityI } from '@app/db/interfaces/domain.interface';
import { Tariff } from './tariff.interface';
import { CallEventEntity } from '../../../../apps/billing/src/core/call-event/call-event.entity';

export interface Transaction extends BaseEntityI {
  customerId: number;
  customer: Customer;
  sum: number;
  date: Date;
  tariffId: number;
  tariff: Tariff;
  callEventId?: number;
  callEvent?: CallEventEntity;
}
