/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import { CustomerWebEntity } from './customer-web.entity';

// authTokensWeb(id, customerWebId, session, expired, payload)
@Entity('authTokensWeb')
export class AuthTokensWebEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @IsInt()
  public id!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Column({ length: 255, nullable: false })
  @Index('auth_tokens_web_session_uindex', { unique: true })
  public session!: string;

  @IsDate()
  @Column({
    precision: null,
    type: 'timestamp',
    nullable: false,
  })
  public expired!: Date;

  @IsObject()
  @Column({ type: 'jsonb', nullable: true })
  public payload?: Record<string, any>;

  @ManyToOne(() => CustomerWebEntity, (customerWeb) => customerWeb.authTokens)
  @JoinColumn({ name: 'customerWebId' })
  @IsInt()
  @Index('auth_tokens_web_customer_web_index')
  public customerWeb?: CustomerWebEntity;

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
