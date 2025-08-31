import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './lib/bd/db.module';
import { CustomerModule } from './core/customer/customer.module';
// import { CustomerModule } from '';

// const appMode = process.env.APP_MODE || 'dev';
// const envFile = `.env.${appMode}`;
const envFile = `.env`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFile],
      isGlobal: true,
    }),
    DBModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
