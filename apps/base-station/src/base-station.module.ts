import { Module } from '@nestjs/common';
import { BaseStationController } from './base-station.controller';
import { BaseStationService } from './base-station.service';
import { AuthTokensGsmModule } from './core/auth-tokens-gsm/auth-tokens-gsm.module';

@Module({
  imports: [AuthTokensGsmModule],
  controllers: [BaseStationController],
  providers: [BaseStationService],
})
export class BaseStationModule {}
