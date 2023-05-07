import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { EmailConfirmationService } from './email-confirmation.service';
export declare class EmailConfirmationController {
    private readonly emailConfirmationService;
    constructor(emailConfirmationService: EmailConfirmationService);
    confirm(dto: ConfirmEmailDto): Promise<void>;
    resendConfirmationLink(userId: string): Promise<void>;
}
