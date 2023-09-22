import { TUserRole, User } from '../../user/entities/user.entity';
import { AuthResponseDto } from '../dto/auth-response.dto';
export type TTokens = {
    accessToken: string;
    refreshToken: string;
};
export type TJwtPayload = {
    sub: string;
    email: string;
    roles: TUserRole[];
    isEmailConfirmed: boolean;
};
export type TAuthResponse = {
    user: AuthResponseDto | User;
    tokens: TTokens;
};
