import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsObject,
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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity('authTokensGSM')
export class AuthTokensGSMEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @IsInt()
  public id!: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.authTokens)
  @JoinColumn({ name: 'customerId' })
  @IsInt()
  @IsNotEmpty()
  @Index('customerId_index')
  public customer: CustomerEntity;

  @Column({ length: 255, nullable: false })
  @IsString()
  @MaxLength(255)
  @Index('session_uindex', { unique: true })
  @IsNotEmpty()
  public session!: string;

  @IsDate()
  @Column({
    precision: null,
    type: 'timestamp',
    nullable: false,
  })
  @IsNotEmpty()
  public expired: Date;

  @IsObject()
  @Column({ type: 'jsonb', nullable: true })
  public payload?: Record<string, any>;

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
