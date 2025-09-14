import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
} from 'class-validator';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';
import { AuthTokensGSM } from '@app/db/interfaces/auth-tokens-gsm.interface';
import { DomainBaseEntity } from 'apps/straphone/src/core/_common/domain.base.entity';

@Entity('authTokensGSM')
export class AuthTokensGSMEntity
  extends DomainBaseEntity
  implements AuthTokensGSM
{
  @IsInt()
  @IsNotEmpty()
  @Index('customerId_index')
  @Column({ type: 'int' })
  public customerId: number;

  @IsString()
  @MaxLength(255)
  @Index('session_uindex', { unique: true })
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  public session!: string;

  @IsDate()
  @IsNotEmpty()
  @Column({
    precision: null,
    type: 'timestamp',
    nullable: false,
  })
  public expired: Date;

  @IsObject()
  @Column({ type: 'jsonb', nullable: true })
  public payload?: Record<string, any>;

  @ManyToOne(() => CustomerEntity, (customer) => customer.authTokens)
  @JoinColumn({
    name: 'customerId',
    foreignKeyConstraintName: 'fk_authTokensGSM_customerId',
  })
  public customer: CustomerEntity;
}
