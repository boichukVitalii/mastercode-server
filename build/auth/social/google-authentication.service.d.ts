import { OnModuleInit } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';
import { TAuthResponse } from '../types';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';
export declare class GoogleAuthService implements OnModuleInit {
    private readonly authService;
    private readonly userService;
    private readonly emailConfirmationService;
    private oauthClient;
    constructor(authService: AuthService, userService: UserService, emailConfirmationService: EmailConfirmationService);
    onModuleInit(): void;
    authenticate(token: string): Promise<TAuthResponse>;
}
