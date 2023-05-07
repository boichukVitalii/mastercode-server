import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import config from 'src/config';

@Injectable()
export class EmailService {
	private readonly nodemailerTransport: Mail;

	constructor() {
		this.nodemailerTransport = createTransport({
			host: config.emailHost,
			port: config.emailPort,
			secure: false,
			tls: {
				ciphers: 'SSLv3',
			},
			auth: {
				user: config.emailUser,
				pass: config.emailPassword,
			},
		});
	}

	async sendMail(options: Mail.Options): Promise<any> {
		return this.nodemailerTransport.sendMail(options);
	}
}
