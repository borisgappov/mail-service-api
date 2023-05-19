import {
  API_GATEWAY_TCP_CLIENT,
  AppConfigModule,
  GATEWAY_HOST,
  GATEWAY_TCP_PORT,
  getTcpClientProvider,
} from '@app/common';
import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [AppConfigModule, LoggerModule.forRoot()],
  controllers: [MailerController],
  providers: [
    getTcpClientProvider(
      API_GATEWAY_TCP_CLIENT,
      GATEWAY_HOST,
      GATEWAY_TCP_PORT,
    ),
    MailerService,
  ],
})
export class MailerModule {}
