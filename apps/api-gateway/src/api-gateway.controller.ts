import { MailMessage, cmd } from '@app/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiGatewayService } from './api-gateway.service';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

@Controller()
export class ApiGatewayController {
  constructor(private readonly gatewayService: ApiGatewayService) {}

  @Post('mail/send')
  async sendMessage(@Body() message: MailMessage): Promise<string> {
    return await this.gatewayService.sendMessage(message);
  }

  @Get('status')
  async getMailerStatus(): Promise<string> {
    return await this.gatewayService.getMailerStatus();
  }

  @EventPattern(cmd.mailSent)
  handleMailSent(info: SentMessageInfo) {
    this.gatewayService.handleMailSent(info);
  }
}
