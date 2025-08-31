import { IsDate, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TariffEntity } from './tariff.entity';
import { CustomerEntity } from './customer.entity';
import { CallEventEntity } from './call-event.entity';

//customerTransactions (id, customerId, sum, date, tariff)
@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id!: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.transactions)
  @JoinColumn({ name: 'customerId' })
  @IsNotEmpty()
  @Index('transaction_customer_index')
  public customer: CustomerEntity;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
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

  @ManyToOne(() => TariffEntity, (tariff) => tariff.transactions)
  @JoinColumn({ name: 'tariffId' })
  @IsNotEmpty()
  @Index('transaction_tariff_index')
  public tariff?: TariffEntity;

  @IsDate()
  @CreateDateColumn({
    precision: null,
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt!: Date;

  @IsDate()
  @UpdateDateColumn({
    precision: null,
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updatedAt!: Date;

  @OneToMany(() => CallEventEntity, (callEvent) => callEvent.transaction)
  callEvents: CallEventEntity[];
}
