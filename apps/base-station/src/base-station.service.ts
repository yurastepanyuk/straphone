import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseStationService {
  getHello(): string {
    return 'Hello World!';
  }
}
