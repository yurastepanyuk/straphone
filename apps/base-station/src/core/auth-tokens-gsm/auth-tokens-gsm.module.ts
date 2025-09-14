import { Module } from '@nestjs/common';
import { AuthTokensGSMEntity } from './auth-tokens-gsm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokensGsmService } from './auth-tokens-gsm.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthTokensGSMEntity])],
  providers: [AuthTokensGsmService],
})
export class AuthTokensGsmModule {}
