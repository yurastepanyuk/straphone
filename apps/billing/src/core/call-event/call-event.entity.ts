import { CallEvent } from '@app/db/interfaces/call-event.interface';
import { DomainBaseEntity } from 'apps/straphone/src/core/_common/domain.base.entity';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TransactionEntity } from '../transaction/transaction.entity';
import { CustomerEntity } from 'apps/base-station/src/core/customer/customer.entity';

@Entity('callEvent')
export class CallEventEntity extends DomainBaseEntity implements CallEvent {
  @IsInt()
  @IsNotEmpty()
  @Index('customerId_index')
  @Column({ type: 'int' })
  public customerId!: number;

  @IsDate()
  @Column({
    precision: null,
    type: 'timestamp',
    nullable: false,
  })
  @IsNotEmpty()
  public dateStart!: Date;

  @IsDate()
  @Column({
    precision: null,
    type: 'timestamp',
    nullable: false,
  })
  @IsNotEmpty()
  public dateEnd!: Date;

  @Column({ type: 'int', precision: null })
  @IsInt()
  public duration?: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.callEvent)
  public transactions?: TransactionEntity[];

  @ManyToOne(() => CustomerEntity, (customer) => customer.callEvents)
  @IsInt()
  @IsNotEmpty()
  @JoinColumn({ name: 'customerId' })
  @Index('call-event-customer_index')
  public customer!: CustomerEntity;
}
