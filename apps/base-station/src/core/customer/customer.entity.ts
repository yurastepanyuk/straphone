import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Customer } from '@app/db/interfaces/customer.interface';
import { DomainBaseEntity } from 'apps/straphone/src/core/_common/domain.base.entity';
import { BalanceEntity } from 'apps/billing/src/core/balance/balance.entity';
import { TransactionEntity } from 'apps/billing/src/core/transaction/transaction.entity';
import { CallEventEntity } from 'apps/billing/src/core/call-event/call-event.entity';
import { AuthTokensGSMEntity } from '../auth-tokens-gsm/auth-tokens-gsm.entity';
import { CustomerWebEntity } from 'apps/straphone/src/core/customer-web/customer-web.entity';
import { TariffEntity } from 'apps/billing/src/core/tariff/tariff.entity';

@Entity(`customer`)
@Index(['phoneNumber', 'imsi'], { unique: true })
export class CustomerEntity extends DomainBaseEntity implements Customer {
  @IsNotEmpty()
  @Index('customer_phone_number_uindex', { unique: true })
  @Column({ type: 'varchar', nullable: false, unique: true })
  public phoneNumber: string;

  @IsNotEmpty()
  @Index('customer_tariff_uindex', { unique: true })
  @Column({ type: 'int', unique: true })
  public tariffId!: number;

  @IsString()
  @MaxLength(38)
  @IsNotEmpty()
  @Index('customer_imsi_uindex', { unique: true })
  @Column({
    type: 'varchar',
    length: 38,
    nullable: false,
    unique: true,
  })
  public imsi: string;

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  public active!: boolean;

  @OneToMany(() => CallEventEntity, (callEvent) => callEvent.customer)
  public callEvents: CallEventEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.customer)
  public transactions: TransactionEntity[];

  @OneToOne(() => BalanceEntity, (balance) => balance.customer)
  public balance?: BalanceEntity;

  @ManyToOne(() => TariffEntity, (tariff) => tariff.customers)
  @JoinColumn({
    name: 'tariffId',
    foreignKeyConstraintName: 'fk_customer_tariff',
  })
  @IsNotEmpty()
  @IsInt()
  public tariff: TariffEntity;

  @OneToOne(() => CustomerWebEntity, (customerWeb) => customerWeb.customer)
  public customerWeb?: CustomerWebEntity;

  @OneToMany(() => AuthTokensGSMEntity, (token) => token.customer)
  public authTokens?: AuthTokensGSMEntity[];
}
