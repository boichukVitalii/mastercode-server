import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from 'src/config';
import { EmailService } from 'src/email/email.service';
import { EntityNotFoundCustomError, ServerConflictError } from 'src/errors/custom-errors';
import { UserService } from 'src/user/user.service';
import {
	EMAIL_ALREADY_CONFIRMED,
	NO_USER_WITH_SUCH_EMAIL,
	TOKEN_VERIFICATION_ERROR,
} from './email.constants';
import { TVerificationTokenPayload } from './email.types';
import { emailConfirmationHTML } from 'src/assets/html';

@Injectable()
export class EmailConfirmationService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly emailService: EmailService,
		private readonly userService: UserService,
	) {}

	async sendVerificationLink(email: string): Promise<any> {
		const payload: TVerificationTokenPayload = { email };
		const token = await this.jwtService.signAsync(payload, {
			secret: config.verificationSecret,
			expiresIn: config.verificationExpire,
		});

		const url = `${config.emailConfirmationUrl}?token=${token}`;
		const subject = 'Email confirmation';
		const html = emailConfirmationHTML(url);

		return this.emailService.sendMail({
			from: config.emailFrom,
			to: email,
			subject,
			html,
		});
	}

	async confirmEmail(email: string): Promise<void> {
		const user = await this.userService.findOne({ email });
		if (!user) throw new EntityNotFoundCustomError(NO_USER_WITH_SUCH_EMAIL(email));
		if (user.is_email_confirmed) throw new ServerConflictError(EMAIL_ALREADY_CONFIRMED);
		await this.userService.updateOne({ email }, { is_email_confirmed: true });
	}

	async decodeConfirmationToken(token: string): Promise<string> {
		const payload = await this.jwtService.verify<TVerificationTokenPayload>(token, {
			secret: config.verificationSecret,
		});
		if (typeof payload === 'object' && 'email' in payload) return payload.email;
		throw new Error(TOKEN_VERIFICATION_ERROR);
	}

	async resendConfirmationLink(id: string): Promise<void> {
		const user = await this.userService.findOneOrThrow({ id });
		if (user.is_email_confirmed) throw new ServerConflictError(EMAIL_ALREADY_CONFIRMED);
		await this.sendVerificationLink(user.email);
	}
}
