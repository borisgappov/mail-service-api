import {
  API_GATEWAY_TCP_CLIENT,
  AppConfigService,
  MailMessage,
  cmd,
} from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Transporter, createTransport } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private transporter: Transporter<SentMessageInfo>;

  constructor(
    private readonly config: AppConfigService,
    @Inject(API_GATEWAY_TCP_CLIENT) private tcpClient: ClientProxy,
  ) {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: this.config.MAILER_SENDER_ADDRESS,
        pass: this.config.MAILER_SENDER_PASSWORD,
      },
    });
  }

  async sendMail(message: MailMessage) {
    try {
      this.logger.log('Message received from MQ', message);

      const res: SentMessageInfo = await this.transporter.sendMail({
        ...message,
        ...(message.isHtml ? { html: message.body } : { text: message.body }),
      });

      this.tcpClient.emit(cmd.mailSent, res).subscribe();

      return 'success';
    } catch (ex) {
      this.logger.error('Sending mail error', ex);
      return 'failed';
    }
  }

  getStatus() {
    this.logger.log('Get mailer status');
    return 'ok';
  }
}
