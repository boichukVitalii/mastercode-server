import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { EmailConfirmationModule } from '../email-confirmation/email-confirmation.module';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { GoogleAuthService } from './social/google-authentication.service';
import { HashingService } from './hashing/hashing.service';
// import { BcryptService } from './hashing/bcrypt.service';
import { ScryptService } from './hashing/scrypt.service';

@Module({
	imports: [
		JwtModule.register({}),
		UserModule,
		EmailConfirmationModule,
		EmailModule,
		TypeOrmModule.forFeature([PasswordResetToken]),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		AccessTokenStrategy,
		RefreshTokenStrategy,
		GoogleAuthService,
		{
			provide: HashingService,
			useClass: ScryptService,
		},
	],
})
export class AuthModule {}
