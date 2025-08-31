import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { TariffEntity } from '../entities/tariff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, TariffEntity])],
  controllers: [],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
