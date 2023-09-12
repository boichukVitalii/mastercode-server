import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { UserService } from '../user/user.service';
export declare class EmailConfirmationService {
    private readonly jwtService;
    private readonly emailService;
    private readonly userService;
    constructor(jwtService: JwtService, emailService: EmailService, userService: UserService);
    sendVerificationLink(email: string): Promise<any>;
    confirmEmail(email: string): Promise<void>;
    decodeConfirmationToken(token: string): Promise<string>;
    resendConfirmationLink(id: string): Promise<void>;
}
