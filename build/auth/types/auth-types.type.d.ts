import { TUserRole, User } from 'src/user/entities/user.entity';
import { AuthResponseDto } from '../dto/auth-response.dto';
export declare type TTokens = {
    accessToken: string;
    refreshToken: string;
};
export declare type TJwtPayload = {
    sub: string;
    email: string;
    roles: TUserRole[];
    isEmailConfirmed: boolean;
};
export declare type TAuthResponse = {
    user: AuthResponseDto | User;
    tokens: TTokens;
};
