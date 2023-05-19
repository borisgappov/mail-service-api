import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const getTcpClientProvider = (
  name: string,
  configHost: string,
  configPort: string,
): Provider => ({
  provide: name,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: configService.get<string>(configHost),
        port: Number(configService.get<string>(configPort)),
      },
    }),
});
