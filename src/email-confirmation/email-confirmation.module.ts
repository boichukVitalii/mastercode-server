import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { UserModule } from '../user/user.module';

@Module({
	imports: [JwtModule.register({}), EmailModule, UserModule],
	controllers: [EmailConfirmationController],
	providers: [EmailConfirmationService],
	exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
