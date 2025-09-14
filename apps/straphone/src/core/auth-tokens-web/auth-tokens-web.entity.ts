import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
} from 'class-validator';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomerWebEntity } from '../customer-web/customer-web.entity';
import { DomainBaseEntity } from '../_common/domain.base.entity';
import { AuthTokensWeb } from '@app/db/interfaces/auth-tokens-web.interface';

@Entity('authTokensWeb')
export class AuthTokensWebEntity
  extends DomainBaseEntity
  implements AuthTokensWeb
{
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Index('auth_tokens_web_session_uindex', { unique: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
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

  @IsInt()
  @IsNotEmpty()
  @Index('auth_tokens_web_customer_web_index')
  @Column({ type: 'int' })
  public customerWebId: number;

  @ManyToOne(() => CustomerWebEntity, (customerWeb) => customerWeb.authTokens)
  @JoinColumn({
    name: 'customerWebId',
    foreignKeyConstraintName: 'fk_authTokensWeb_customerWebId',
  })
  public customerWeb?: CustomerWebEntity;
}
