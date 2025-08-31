import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { TransactionEntity } from './transaction.entity';

@Entity('callEvent')
export class CallEventEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.callEvents)
  @IsInt()
  @IsNotEmpty()
  @JoinColumn({ name: 'customerId' })
  @Index('call-event-customer_index')
  public customer!: CustomerEntity;

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

  @ManyToOne(() => TransactionEntity, (transaction) => transaction.callEvents)
  @JoinColumn({ name: 'transactionId' })
  public transaction?: TransactionEntity;

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
