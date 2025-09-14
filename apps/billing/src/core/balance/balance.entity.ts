import { Check, Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Balance } from '@app/db/interfaces/balance.interface';
import { CustomerEntity } from 'apps/base-station/src/core/customer/customer.entity';
import { DomainBaseEntity } from 'apps/straphone/src/core/_common/domain.base.entity';
import { IsNotEmpty } from 'class-validator';

@Entity('balance')
@Check('balance_positive', 'balance >= 0')
export class BalanceEntity extends DomainBaseEntity implements Balance {
  @IsNotEmpty()
  @Index('balance_customer_uindex', { unique: true })
  @Column({ type: 'int', unique: true })
  public customerId!: number;

  @IsNotEmpty()
  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  public balance: number;

  @OneToOne(() => CustomerEntity, (customer) => customer.balance)
  @JoinColumn({
    name: 'customerId',
    foreignKeyConstraintName: 'fk_balance_customerId',
  })
  @IsNotEmpty()
  public customer: CustomerEntity;
}
