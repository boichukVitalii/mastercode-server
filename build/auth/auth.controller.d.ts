import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';
import { AuthService } from './auth.service';
import { SigninLocalDto } from './dto/signin-local.dto';
import { SignupLocalDto } from './dto/signup-local.dto';
import { TAuthResponse, TTokens } from './types';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { GoogleAuthService } from './social/google-authentication.service';
import { GoogleTokenDto } from './dto/google-token.dto';
export declare class AuthController {
    private readonly authService;
    private readonly emailConfirmationService;
    private readonly googleAuthService;
    constructor(authService: AuthService, emailConfirmationService: EmailConfirmationService, googleAuthService: GoogleAuthService);
    signupLocal(dto: SignupLocalDto): Promise<TAuthResponse>;
    signinLocal(dto: SigninLocalDto): Promise<TAuthResponse>;
    auth(dto: GoogleTokenDto): Promise<TAuthResponse>;
    logout(userId: string): Promise<void>;
    refreshTokens(userId: string, refreshToken: string): Promise<TTokens>;
    getPasswordResetToken({ email }: ResetPasswordDto): Promise<void>;
    resetPassword(dto: NewPasswordDto): Promise<void>;
}
