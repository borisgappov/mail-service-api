import { Test, TestingModule } from '@nestjs/testing';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { MAILER_TCP_CLIENT, MailMessage, RMQ_SERVICE } from '@app/common';

const clientProxyMock = jest.fn(() => ({
  send: jest.fn(() => 'success'),
}));

const apiGatewayServiceMock = jest.fn(() => ({
  sendMessage: jest.fn(() => 'success'),
  getMailerStatus: jest.fn(() => 'ok'),
}));

describe('ApiGatewayController', () => {
  let apiGatewayController: ApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiGatewayController],
      providers: [
        { provide: ApiGatewayService, useClass: apiGatewayServiceMock },
        { provide: RMQ_SERVICE, useClass: clientProxyMock },
        { provide: MAILER_TCP_CLIENT, useClass: clientProxyMock },
      ],
    }).compile();

    apiGatewayController = app.get<ApiGatewayController>(ApiGatewayController);
  });

  describe('Send Message', () => {
    it('should return "ok"', async () => {
      expect(await apiGatewayController.sendMessage({} as MailMessage)).toBe(
        'success',
      );
    });
  });

  describe('Get Mailer Status', () => {
    it('should return "ok"', async () => {
      expect(await apiGatewayController.getMailerStatus()).toBe('ok');
    });
  });
});
