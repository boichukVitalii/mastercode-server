import { PasswordResetToken } from '../../auth/entities/password-reset-token.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { File } from '../../file/entities/file.entity';
import { ProblemReaction } from '../../problem/entities/problem-reaction.entity';
import { UserSolvedProblem } from './user-solved-problem.entity';
export declare const UserRole: {
    readonly USER: "user";
    readonly ADMIN: "admin";
};
export type TUserRole = typeof UserRole[keyof typeof UserRole];
export declare class User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password_hash?: string | null;
    avatar?: File | null;
    avatar_id?: string | null;
    additional_info?: string | null;
    roles: TUserRole[];
    comments: Comment[];
    is_email_confirmed: boolean;
    password_reset_tokens: PasswordResetToken[];
    google_id?: string | null;
    problems_reactions: ProblemReaction[];
    solved_problems: UserSolvedProblem[];
    created_at: Date;
    updated_at: Date;
    refresh_token_hash?: string | null;
}
