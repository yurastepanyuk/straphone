import { IsDate, IsInt, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { BaseEntityI, ID } from '@app/db/interfaces/domain.interface';

export abstract class DomainBaseEntity implements BaseEntityI {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id!: ID;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @Column({ type: 'int', unsigned: true, nullable: true })
  public createdBy?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @Column({ type: 'int', unsigned: true, nullable: true })
  public updatedBy?: number;

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
