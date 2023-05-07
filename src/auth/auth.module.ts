import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { EmailConfirmationModule } from 'src/email-confirmation/email-confirmation.module';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { GoogleAuthService } from './social/google-authentication.service';

@Module({
	imports: [
		JwtModule.register({}),
		UserModule,
		EmailConfirmationModule,
		EmailModule,
		TypeOrmModule.forFeature([PasswordResetToken]),
	],
	controllers: [AuthController],
	providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, GoogleAuthService],
})
export class AuthModule {}
