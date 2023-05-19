import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import * as joi from 'joi';

const EnvConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: joi.object({
    GATEWAY_HOST: joi.string().required(),
    GATEWAY_HTTP_PORT: joi.string().required(),
    GATEWAY_TCP_PORT: joi.string().required(),

    MAILER_HOST: joi.string().required(),
    MAILER_TCP_PORT: joi.string().required(),

    RMQ_URI: joi.string().required(),
    RMQ_MAILER_QUEUE: joi.string().required(),
  }),
  envFilePath: './libs/common/.env',
});

@Module({
  imports: [ConfigModule, EnvConfigModule],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigModule, AppConfigService],
})
export class AppConfigModule {}
