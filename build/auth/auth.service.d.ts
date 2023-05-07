import { SignupLocalDto } from './dto/signup-local.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SigninLocalDto } from './dto/signin-local.dto';
import { DataSource, Repository } from 'typeorm';
import { TAuthResponse, TJwtPayload, TTokens } from './types';
import { EmailService } from 'src/email/email.service';
import { PasswordResetToken } from './entities/password-reset-token.entity';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly emailService;
    private readonly dataSource;
    private readonly passwordResetTokenRepository;
    constructor(userService: UserService, jwtService: JwtService, emailService: EmailService, dataSource: DataSource, passwordResetTokenRepository: Repository<PasswordResetToken>);
    signupLocal(dto: SignupLocalDto): Promise<TAuthResponse>;
    signinLocal(dto: SigninLocalDto): Promise<TAuthResponse>;
    logout(userId: string): Promise<void>;
    refreshTokens(userId: string, refreshToken: string): Promise<TTokens>;
    generatePasswordResetToken(email: string): Promise<void>;
    resetPassword(passwordResetToken: string, newPassword: string): Promise<void>;
    private updateRefreshTokenHash;
    private hashData;
    getTokens(payload: TJwtPayload): Promise<TTokens>;
}
