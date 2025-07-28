import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // or smtp.sendgrid.net
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async send(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: '"SendIT App" <no-reply@sendit.com>',
      to,
      subject,
      html,
    });
  }
}
