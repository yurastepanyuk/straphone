/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TariffEntity } from './tariff.entity';
import { CustomerWebEntity } from './customer-web.entity';
import { AuthTokensGSMEntity } from './auth-tokens-gsm.entity';
import { CallEventEntity } from './call-event.entity';
import { TransactionEntity } from './transaction.entity';
import { BalanceEntity } from './balance.entity';

@Entity(`customer`)
@Index(['phoneNumber', 'IMSI'], { unique: true })
export class CustomerEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @IsInt()
  public id!: number;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty()
  @Index('customer_phone_number_uindex', { unique: true })
  public phoneNumber: string;

  @ManyToOne(() => TariffEntity, (tariff) => tariff.customers)
  @JoinColumn({ name: 'tariffId' })
  @IsNotEmpty()
  @IsInt()
  public tariff: TariffEntity;

  @Column({
    type: 'varchar',
    length: 38,
    nullable: false,
    unique: true,
  })
  @IsString()
  @MaxLength(38)
  @IsNotEmpty()
  @Index('customer_IMSI_uindex', { unique: true })
  public IMSI: string;

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  public active!: boolean;

  @OneToOne(() => CustomerWebEntity, (customerWeb) => customerWeb.customer)
  @JoinColumn({ name: 'customerWebId' })
  @Index('customer_customer_web_index')
  public customerWeb?: CustomerWebEntity;

  @OneToMany(() => AuthTokensGSMEntity, (token) => token.customer)
  public authTokens?: AuthTokensGSMEntity[];

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

  @OneToMany(() => CallEventEntity, (callEvent) => callEvent.customer)
  public callEvents: CallEventEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.customer)
  public transactions: TransactionEntity[];

  @OneToOne(() => BalanceEntity, (balance) => balance.customer)
  @JoinColumn({ name: 'balanceId' })
  @Index('customer_balance_index', { unique: true })
  public balance?: BalanceEntity;
}
