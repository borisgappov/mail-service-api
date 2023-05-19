import { AppConfigService, LOCAL } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));

  const config = app.get(AppConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: LOCAL, port: config.GATEWAY_TCP_PORT },
  });

  SwaggerModule.setup(
    'swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Mail service API')
        .setDescription('Test app for a Full Stack Developer position')
        .setVersion('1.0')
        .addTag('mail')
        .build(),
    ),
  );

  await app.startAllMicroservices();
  await app.listen(config.GATEWAY_HTTP_PORT);
}

bootstrap();
