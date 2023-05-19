import {
  AppConfigModule,
  AppConfigService,
  MAILER_HOST,
  MAILER_TCP_CLIENT,
  MAILER_TCP_PORT,
  RMQ_SERVICE,
  getTcpClientProvider,
} from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: RMQ_SERVICE,
        imports: [AppConfigModule],
        useFactory: (config: AppConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.RMQ_URI],
            queue: config.RMQ_MAILER_QUEUE,
          },
        }),
        inject: [AppConfigService],
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [
    getTcpClientProvider(MAILER_TCP_CLIENT, MAILER_HOST, MAILER_TCP_PORT),
    ApiGatewayService,
  ],
})
export class ApiGatewayModule {}
