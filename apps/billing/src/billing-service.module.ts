import { Module } from '@nestjs/common';
import { BillingServiceController } from './billing-service.controller';
import { BillingServiceService } from './billing-service.service';
import { BalanceController } from './core/balance/balance.controller';
import { BalanceModule } from './core/balance/balance.module';
import { CallEventModule } from './core/call-event/call-event.module';
import { TariffModule } from './core/tariff/tariff.module';
import { TransactionModule } from './core/transaction/transaction.module';

@Module({
  imports: [BalanceModule, CallEventModule, TariffModule, TransactionModule],
  controllers: [BillingServiceController, BalanceController],
  providers: [BillingServiceService],
})
export class BillingServiceModule {}
