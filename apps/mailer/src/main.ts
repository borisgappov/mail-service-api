import { AppConfigService, LOCAL } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { MailerModule } from './mailer.module';

async function bootstrap() {
  const app = await NestFactory.create(MailerModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));

  const config = app.get(AppConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: LOCAL, port: config.MAILER_TCP_PORT },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      noAck: false,
      urls: [config.RMQ_URI],
      queue: config.RMQ_MAILER_QUEUE,
    },
  });

  await app.startAllMicroservices();
}

bootstrap();
