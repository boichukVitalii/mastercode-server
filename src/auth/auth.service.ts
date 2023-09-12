import { Injectable } from '@nestjs/common';
import { SignupLocalDto } from './dto/signup-local.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SigninLocalDto } from './dto/signin-local.dto';
import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { TAuthResponse, TJwtPayload, TTokens } from './types';
import config from '../config';
import {
	EmailNotConfirmedError,
	InvalidTokenError,
	WrongCredentialsError,
} from '../errors/custom-errors';
import { User } from '../user/entities/user.entity';
import { EmailService } from '../email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { passwordResetHTML } from '../assets/html';
import { INVALID_RESET_TOKEN_ERROR, TOKEN_HAS_EXPIRED_ERROR } from './auth.constants';
import { HashingService } from './hashing/hashing.service';

import { randomBytes, createHash } from 'node:crypto';
import { promisify } from 'node:util';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly emailService: EmailService,
		private readonly hashingService: HashingService,
		private readonly dataSource: DataSource,
		@InjectRepository(PasswordResetToken)
		private readonly passwordResetTokenRepository: Repository<PasswordResetToken>,
	) {}

	async signupLocal(dto: SignupLocalDto): Promise<TAuthResponse> {
		const password_hash = await this.hashingService.hash(dto.password);
		const user = await this.userService.create({ ...dto, password_hash });
		const tokens = await this.getTokens({
			sub: user.id,
			email: user.email,
			roles: user.roles,
			isEmailConfirmed: user.is_email_confirmed,
		});
		await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
		return { user, tokens };
	}

	async signinLocal(dto: SigninLocalDto): Promise<TAuthResponse> {
		const user = await this.userService.findOne({ email: dto.email });
		if (!user || !user.password_hash) throw new WrongCredentialsError();
		const passwordMatches = await this.hashingService.compare(dto.password, user.password_hash);
		if (!passwordMatches) throw new WrongCredentialsError();
		if (!user.is_email_confirmed) throw new EmailNotConfirmedError();
		const tokens = await this.getTokens({
			sub: user.id,
			email: user.email,
			roles: user.roles,
			isEmailConfirmed: user.is_email_confirmed,
		});
		await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
		return { user, tokens };
	}

	async logout(userId: string): Promise<void> {
		await this.userService.updateMany(
			{ where: { id: userId, refresh_token_hash: Not(IsNull()) } },
			{ refresh_token_hash: null },
		);
	}

	async refreshTokens(userId: string, refreshToken: string): Promise<TTokens> {
		const user = await this.userService.findOne({ id: userId });
		if (!user || !user.refresh_token_hash) throw new WrongCredentialsError();

		const refreshTokenMatches = await this.hashingService.compare(
			refreshToken,
			user.refresh_token_hash,
		);
		if (!refreshTokenMatches) throw new WrongCredentialsError();

		const tokens = await this.getTokens({
			sub: user.id,
			email: user.email,
			roles: user.roles,
			isEmailConfirmed: user.is_email_confirmed,
		});
		await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
		return tokens;
	}

	async generatePasswordResetToken(email: string): Promise<void> {
		const user = await this.userService.findOne({ email });
		if (!user) return;

		const randomBytesPromise = promisify(randomBytes);
		const sizeInBytes = 48;
		const token = (await randomBytesPromise(sizeInBytes)).toString('hex');

		const token_hash = createHash('sha256').update(token).digest('base64url');

		const _15MinInMs = 900000;
		const resetTokenEntity = this.passwordResetTokenRepository.create({
			user,
			token_hash,
			token_expiry: Date.now() + _15MinInMs,
		});
		await this.passwordResetTokenRepository.save(resetTokenEntity);

		const url = `${config.emailResetPasswordUrl}?token=${token}`;
		const subject = 'Password reset';
		const html = passwordResetHTML(url);

		await this.emailService.sendMail({
			from: config.emailFrom,
			to: email,
			subject,
			html,
		});
	}

	async resetPassword(passwordResetToken: string, newPassword: string): Promise<void> {
		const token_hash = createHash('sha256').update(passwordResetToken).digest('base64url');
		const resetTokenEntity = await this.passwordResetTokenRepository.findOneBy({ token_hash });
		if (!resetTokenEntity) throw new InvalidTokenError(INVALID_RESET_TOKEN_ERROR);
		const userId = resetTokenEntity.user.id;

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const allTokensForUser = await queryRunner.manager.findBy(PasswordResetToken, {
				user: { id: userId },
			});

			const matchedRow = allTokensForUser.find((row) => row.token_hash === token_hash);
			if (!matchedRow) throw new InvalidTokenError(INVALID_RESET_TOKEN_ERROR);

			await queryRunner.manager.delete(PasswordResetToken, { user: { id: userId } });

			if (matchedRow.token_expiry < Date.now()) {
				throw new InvalidTokenError(TOKEN_HAS_EXPIRED_ERROR);
			}

			const password_hash = await this.hashingService.hash(newPassword);
			await queryRunner.manager.update(User, { id: userId }, { password_hash });

			await queryRunner.commitTransaction();
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		} finally {
			await queryRunner.release();
		}
	}

	private async updateRefreshTokenHash(userId: string, refreshToken: string): Promise<void> {
		const refresh_token_hash = await this.hashingService.hash(refreshToken);
		await this.userService.updateOne({ id: userId }, { refresh_token_hash });
	}

	async getTokens(payload: TJwtPayload): Promise<TTokens> {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: config.accessSecret,
				expiresIn: config.accessExpire,
			}),
			this.jwtService.signAsync(payload, {
				secret: config.refreshSecret,
				expiresIn: config.refreshExpire,
			}),
		]);
		return { accessToken, refreshToken };
	}
}
