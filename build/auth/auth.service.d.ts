import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthService {
    signupLocal(createAuthDto: CreateAuthDto): any;
    signinLocal(createAuthDto: CreateAuthDto): any;
    logout(createAuthDto: CreateAuthDto): any;
    refreshTokens(createAuthDto: CreateAuthDto): any;
}
