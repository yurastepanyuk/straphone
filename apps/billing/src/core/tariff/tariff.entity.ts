import { Tariff } from '@app/db/interfaces/tariff.interface';
import { CustomerEntity } from 'apps/base-station/src/core/customer/customer.entity';
import { DomainBaseEntity } from 'apps/straphone/src/core/_common/domain.base.entity';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { TransactionEntity } from '../transaction/transaction.entity';

@Entity(`tariff`)
export class TariffEntity extends DomainBaseEntity implements Tariff {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @Column({ type: 'varchar', nullable: false, unique: true, length: 128 })
  name: string;

  @Column({ type: 'integer', nullable: false })
  cost: number;

  @Column({ type: 'integer', nullable: false, default: 0 })
  freeMinuteMounth: number;

  @OneToMany(() => CustomerEntity, (customer) => customer.tariff)
  public customers: CustomerEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.tariff)
  public transactions: TransactionEntity[];
}
