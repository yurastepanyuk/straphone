import { IsDate, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity('balance')
export class BalanceEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id!: number;

  @OneToOne(() => CustomerEntity, (customer) => customer.balance)
  @JoinColumn({ name: 'customerId' })
  @IsNotEmpty()
  @Index('balance_customer_uindex', { unique: true })
  public customer: CustomerEntity;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  @IsNotEmpty()
  public balance: number;

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
  })
  public updatedAt!: Date;
}
