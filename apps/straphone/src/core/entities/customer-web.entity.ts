/* eslint-disable @typescript-eslint/no-unsafe-call */
// customerWeb(id, customerId, name, pass)

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
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { AuthTokensWebEntity } from './auth-tokens-web.entity';

@Entity('customerWeb')
export class CustomerWebEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @IsInt()
  public id!: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  public name: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  public pass: string;

  @OneToOne(() => CustomerEntity, (customer) => customer.customerWeb)
  @JoinColumn({ name: 'customerId' })
  @IsNotEmpty()
  @Index('customer_web_customer_index', { unique: true })
  public customer: CustomerEntity;

  @OneToMany(() => AuthTokensWebEntity, (token) => token.customerWeb)
  public authTokens?: AuthTokensWebEntity[];

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
