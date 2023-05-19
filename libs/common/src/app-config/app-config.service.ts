import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GATEWAY_HOST,
  GATEWAY_HTTP_PORT,
  GATEWAY_TCP_PORT,
  MAILER_HOST,
  MAILER_SENDER_ADDRESS,
  MAILER_SENDER_PASSWORD,
  MAILER_TCP_PORT,
  RMQ_MAILER_QUEUE,
  RMQ_URI,
} from '../shared/constats';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get GATEWAY_HOST(): string {
    return this.configService.get<string>(GATEWAY_HOST);
  }
  get GATEWAY_HTTP_PORT(): string {
    return this.configService.get<string>(GATEWAY_HTTP_PORT);
  }
  get GATEWAY_TCP_PORT(): string {
    return this.configService.get<string>(GATEWAY_TCP_PORT);
  }
  get MAILER_HOST(): string {
    return this.configService.get<string>(MAILER_HOST);
  }
  get MAILER_TCP_PORT(): string {
    return this.configService.get<string>(MAILER_TCP_PORT);
  }
  get MAILER_SENDER_ADDRESS(): string {
    return this.configService.get<string>(MAILER_SENDER_ADDRESS);
  }
  get MAILER_SENDER_PASSWORD(): string {
    return this.configService.get<string>(MAILER_SENDER_PASSWORD);
  }
  get RMQ_URI(): string {
    return this.configService.get<string>(RMQ_URI);
  }
  get RMQ_MAILER_QUEUE(): string {
    return this.configService.get<string>(RMQ_MAILER_QUEUE);
  }
}
