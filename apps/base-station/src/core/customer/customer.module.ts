import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { TariffEntity } from '../../../../billing/src/core/tariff/tariff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, TariffEntity])],
  controllers: [],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
