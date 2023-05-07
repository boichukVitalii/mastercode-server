import {
	Controller,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	UseGuards,
	ClassSerializerInterceptor,
	UseInterceptors,
	BadRequestException,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/blocks/decorators/get-current-user.decorator';
import { GetCurrentUserId } from 'src/blocks/decorators/get-current-userId.decorator';
import { Public } from 'src/blocks/decorators/public.decorator';
import { RefreshTokenGuard } from 'src/blocks/guards/refresh-token.guard';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { SigninLocalDto } from './dto/signin-local.dto';
import { SignupLocalDto } from './dto/signup-local.dto';
import { TAuthResponse, TTokens } from './types';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { PASSWORDS_NOT_MATCH_ERROR } from './auth.constants';
import { GoogleAuthService } from './social/google-authentication.service';
import { GoogleTokenDto } from './dto/google-token.dto';

@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly emailConfirmationService: EmailConfirmationService,
		private readonly googleAuthService: GoogleAuthService,
	) {}

	@Public()
	@Post('local/signup')
	@HttpCode(HttpStatus.CREATED)
	async signupLocal(@Body() dto: SignupLocalDto): Promise<TAuthResponse> {
		if (dto.password !== dto.confirm_password) {
			throw new BadRequestException(PASSWORDS_NOT_MATCH_ERROR);
		}
		const { user, tokens } = await this.authService.signupLocal(dto);
		await this.emailConfirmationService.sendVerificationLink(dto.email);
		return {
			user: new AuthResponseDto(user),
			tokens,
		};
	}

	@Public()
	@Post('local/signin')
	@HttpCode(HttpStatus.OK)
	async signinLocal(@Body() dto: SigninLocalDto): Promise<TAuthResponse> {
		const { user, tokens } = await this.authService.signinLocal(dto);
		return {
			user: new AuthResponseDto(user),
			tokens,
		};
	}

	@Public()
	@Post('social/google')
	async auth(@Body() dto: GoogleTokenDto): Promise<TAuthResponse> {
		return this.googleAuthService.authenticate(dto.token);
	}

	@Post('logout')
	@HttpCode(HttpStatus.NO_CONTENT)
	async logout(@GetCurrentUserId() userId: string): Promise<void> {
		await this.authService.logout(userId);
	}

	@Public()
	@UseGuards(RefreshTokenGuard)
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refreshTokens(
		@GetCurrentUserId() userId: string,
		@GetCurrentUser('refresh_token_hash') refreshToken: string,
	): Promise<TTokens> {
		return this.authService.refreshTokens(userId, refreshToken);
	}

	@Public()
	@Post('password-reset-token')
	@HttpCode(HttpStatus.NO_CONTENT)
	async getPasswordResetToken(@Body() { email }: ResetPasswordDto): Promise<void> {
		await this.authService.generatePasswordResetToken(email);
	}

	@Public()
	@Post('reset-password')
	@HttpCode(HttpStatus.NO_CONTENT)
	async resetPassword(@Body() dto: NewPasswordDto): Promise<void> {
		if (dto.password !== dto.confirm_password) {
			throw new BadRequestException(PASSWORDS_NOT_MATCH_ERROR);
		}
		await this.authService.resetPassword(dto.token, dto.password);
	}
}
