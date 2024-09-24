import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

import config from '../../config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(
  @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ){
    this.transporter = nodemailer.createTransport({
      host: this.configService.mail.host,
      port: this.configService.mail.host,
      secure: this.configService.mail.secure,
      auth: {
        user: this.configService.mail.user,
        pass: this.configService.mail.password
      },
  })}

  async sendMail(to: string, subject: string, html: string, text?: string) {
    const mailOptions = {
      from: this.configService.mail.user,
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}
