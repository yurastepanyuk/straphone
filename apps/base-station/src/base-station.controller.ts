import { Controller, Get } from '@nestjs/common';
import { BaseStationService } from './base-station.service';

@Controller()
export class BaseStationController {
  constructor(private readonly baseStationService: BaseStationService) {}

  @Get()
  getHello(): string {
    return this.baseStationService.getHello();
  }
}
