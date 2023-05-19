import { MAILER_TCP_CLIENT, MailMessage, RMQ_SERVICE, cmd } from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom as promise } from 'rxjs';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class ApiGatewayService {
  private readonly logger = new Logger(ApiGatewayService.name);

  constructor(
    @Inject(RMQ_SERVICE) private readonly client: ClientProxy,
    @Inject(MAILER_TCP_CLIENT) private readonly tcpClient: ClientProxy,
  ) {}

  async sendMessage(message: MailMessage): Promise<string> {
    this.logger.log(`Sending message`);
    return await promise(this.client.send({ cmd: cmd.sendMail }, message));
  }

  async getMailerStatus(): Promise<string> {
    this.logger.log(`Get Mailer Status`);
    return await promise(this.tcpClient.send({ cmd: cmd.getStatus }, {}));
  }

  handleMailSent(info: SentMessageInfo) {
    this.logger.log('The mail was successfully sent');
    this.logger.log(info);
    // some logic here
  }
}
