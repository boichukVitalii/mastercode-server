import { Injectable, OnModuleInit } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { AuthService } from '../auth.service';
import config from 'src/config';
import { WrongCredentialsError } from 'src/errors/custom-errors';
import { UserService } from 'src/user/user.service';
import { TAuthResponse } from '../types';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';
import { COULD_NOT_OBTAIN_EMAIL_GOOGLE_ERROR } from '../auth.constants';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
	private oauthClient: OAuth2Client;

	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly emailConfirmationService: EmailConfirmationService,
	) {}

	onModuleInit(): void {
		const clientId = config.googleClientId;
		const clientSecret = config.googleClientSecret;
		this.oauthClient = new OAuth2Client(clientId, clientSecret);
	}

	async authenticate(token: string): Promise<TAuthResponse> {
		const loginTicket = await this.oauthClient.verifyIdToken({
			idToken: token,
		});
		const { email, sub: google_id, name } = loginTicket.getPayload() as TokenPayload;
		if (!email) throw new WrongCredentialsError(COULD_NOT_OBTAIN_EMAIL_GOOGLE_ERROR);
		const [first_name, last_name] = name ? name.split(' ') : ['Unknown', 'Unknown'];
		const user = await this.userService.findOne({ google_id });
		if (user) {
			const tokens = await this.authService.getTokens({
				sub: user.id,
				email: user.email,
				roles: user.roles,
				isEmailConfirmed: true,
			});
			return { user, tokens };
		}
		const newUser = await this.userService.create({ email, google_id, first_name, last_name });
		await this.emailConfirmationService.confirmEmail(email);
		const tokens = await this.authService.getTokens({
			sub: newUser.id,
			email: newUser.email,
			roles: newUser.roles,
			isEmailConfirmed: true,
		});
		return { user: newUser, tokens };
	}
}
