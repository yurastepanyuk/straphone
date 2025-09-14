import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from '../../../libs/db/src/db.module';
import { CustomerModule } from '../../base-station/src/core/customer/customer.module';
// import { CustomerModule } from '';
import { AuthTokensWebModule } from './core/auth-tokens-web/auth-tokens-web.module';
import { CustomerWebModule } from './core/customer-web/customer-web.module';

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
    AuthTokensWebModule,
    CustomerWebModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
