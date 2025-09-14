import { NestFactory } from '@nestjs/core';
import { BaseStationModule } from './base-station.module';

async function bootstrap() {
  const app = await NestFactory.create(BaseStationModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
