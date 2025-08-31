import { Injectable, OnModuleInit } from '@nestjs/common';
import { CustomerService } from './core/customer/customer.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly customerService: CustomerService) {}

  async onModuleInit() {
    await this.customerService.createDefaultCustomers();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
