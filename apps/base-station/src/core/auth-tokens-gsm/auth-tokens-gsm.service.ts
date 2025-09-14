import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthTokensGSMEntity } from './auth-tokens-gsm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthTokensGsmService {
  constructor(
    @InjectRepository(AuthTokensGSMEntity)
    private readonly authTokensGSMRepository: Repository<AuthTokensGSMEntity>,
  ) {}
}
