import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetCurrentUserId } from 'src/blocks/decorators/get-current-userId.decorator';
import { Public } from 'src/blocks/decorators/public.decorator';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { EmailConfirmationService } from './email-confirmation.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('email-confirmation')
@Controller('email-confirmation')
export class EmailConfirmationController {
	constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

	@Public()
	@Post('confirm')
	@HttpCode(HttpStatus.NO_CONTENT)
	async confirm(@Body() dto: ConfirmEmailDto): Promise<void> {
		const email = await this.emailConfirmationService.decodeConfirmationToken(dto.token);
		await this.emailConfirmationService.confirmEmail(email);
	}

	@Public()
	@Post('resend-confirmation-link')
	@HttpCode(HttpStatus.NO_CONTENT)
	async resendConfirmationLink(@GetCurrentUserId() userId: string): Promise<void> {
		await this.emailConfirmationService.resendConfirmationLink(userId);
	}
}
