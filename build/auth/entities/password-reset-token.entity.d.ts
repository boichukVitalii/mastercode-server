import { User } from '../../user/entities/user.entity';
export declare class PasswordResetToken {
    id: string;
    user: User;
    token_hash: string;
    token_expiry: number;
}
