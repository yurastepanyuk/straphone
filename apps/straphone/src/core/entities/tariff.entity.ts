import {
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
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { TransactionEntity } from './transaction.entity';

@Entity(`tariff`)
export class TariffEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @IsInt()
  id!: number;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  name: string;

  @Column({ type: 'decimal', nullable: false })
  cost: number;

  @Column({ type: 'integer', nullable: false, default: 0 })
  freeMinuteMounth: number;

  @OneToMany(() => CustomerEntity, (customer) => customer.tariff)
  customers: CustomerEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.tariff)
  public transactions: TransactionEntity[];

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
}
