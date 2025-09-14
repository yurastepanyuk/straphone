import { Transaction } from '@app/db/interfaces/transaction.interface';
import { DomainBaseEntity } from 'apps/straphone/src/core/_common/domain.base.entity';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CallEventEntity } from '../call-event/call-event.entity';
import { TariffEntity } from '../tariff/tariff.entity';
import { CustomerEntity } from 'apps/base-station/src/core/customer/customer.entity';

@Entity('transaction')
export class TransactionEntity extends DomainBaseEntity implements Transaction {
  @IsInt()
  @IsNotEmpty()
  @Index('customerId_index')
  @Column({ type: 'int' })
  public customerId: number;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  @IsNotEmpty()
  public sum: number;

  @IsDate()
  @Column({
    precision: null,
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsNotEmpty()
  public date: Date;

  @IsInt()
  @IsNotEmpty()
  @Column({ type: 'int' })
  public tariffId: number;

  @Column({ type: 'int', nullable: true })
  callEventId: number;

  @ManyToOne(() => CallEventEntity, (callEvent) => callEvent.transactions)
  @JoinColumn({
    name: 'callEventId',
    foreignKeyConstraintName: 'fk_transaction_callEvent',
  })
  public callEvent: CallEventEntity;

  @ManyToOne(() => TariffEntity, (tariff) => tariff.transactions)
  @JoinColumn({ name: 'tariffId' })
  @IsNotEmpty()
  @Index('transaction_tariff_index')
  public tariff: TariffEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.transactions)
  @JoinColumn({ name: 'customerId' })
  @IsNotEmpty()
  @Index('transaction_customer_index')
  public customer: CustomerEntity;
}
