import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { TariffEntity } from '../../../../billing/src/core/tariff/tariff.entity';
import { CreateCustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(TariffEntity)
    private readonly tariffRepository: Repository<TariffEntity>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    const customer = this.customerRepository.create(createCustomerDto);

    if (createCustomerDto.tariffId) {
      const tariff = await this.tariffRepository.findOneBy({
        id: createCustomerDto.tariffId,
      });
      if (!tariff) {
        throw new Error('Tariff not found');
      }
      customer.tariff = tariff;
    }

    return this.customerRepository.save(customer);
  }

  async insertSimple(data: Partial<CustomerEntity>): Promise<void> {
    await this.customerRepository.insert(data);
  }

  async createDefaultCustomers(): Promise<void> {
    const existing = await this.customerRepository.count();
    if (existing > 0) {
      console.log('Customers already seeded');
      return;
    }

    const defaultCustomer: CreateCustomerDto = {
      phoneNumber: '+380971112233',
      tariffId: 1,
      imsi: '12345678901234567890123456789012345678',
      active: true,
      // customerWebId: 1,
      balanceId: 10,
    };

    const tariff = await this.tariffRepository.findOneBy({
      id: defaultCustomer.tariffId,
    });
    if (!tariff) {
      const defaultTariff: Record<string, any> = {
        name: 'Starter',
        cost: 100,
        freeMinuteMounth: 0,
      };

      const tariffSaved = await this.tariffRepository.save(defaultTariff);
      console.log('Default tariff added', tariffSaved);
    }

    await this.create(defaultCustomer);
    console.log('Default customer added');
  }
}
