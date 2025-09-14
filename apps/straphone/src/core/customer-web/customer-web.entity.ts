// customerWeb(id, customerId, name, pass)

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { DomainBaseEntity } from '../_common/domain.base.entity';
import { CustomerEntity } from 'apps/base-station/src/core/customer/customer.entity';
import { AuthTokensWebEntity } from '../auth-tokens-web/auth-tokens-web.entity';

@Entity('customerWeb')
export class CustomerWebEntity extends DomainBaseEntity {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @Column({ type: 'varchar', nullable: false })
  public pass: string;

  @OneToOne(() => CustomerEntity, (customer) => customer.customerWeb)
  @JoinColumn({ name: 'customerId' })
  @IsNotEmpty()
  @Index('customer_web_customer_index', { unique: true })
  public customer: CustomerEntity;

  @OneToMany(() => AuthTokensWebEntity, (token) => token.customerWeb)
  public authTokens?: AuthTokensWebEntity[];
}
