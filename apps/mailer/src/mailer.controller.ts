import { MailMessage, cmd } from '@app/common';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailerService } from './mailer.service';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern({ cmd: cmd.sendMail })
  async sendMail(message: MailMessage) {
    return await this.mailerService.sendMail(message);
  }

  @MessagePattern({ cmd: cmd.getStatus })
  getStatus() {
    return this.mailerService.getStatus();
  }
}
