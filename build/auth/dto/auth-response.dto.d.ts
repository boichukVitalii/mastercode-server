import { Comment } from '../../comment/entities/comment.entity';
import { File } from '../../file/entities/file.entity';
import { TUserRole, User } from '../../user/entities/user.entity';
import { PasswordResetToken } from '../entities/password-reset-token.entity';
import { ProblemReaction } from '../../problem/entities/problem-reaction.entity';
import { UserSolvedProblem } from '../../user/entities/user-solved-problem.entity';
export declare class AuthResponseDto implements User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    avatar?: File | null;
    additional_info?: string | null;
    roles: TUserRole[];
    comments: Comment[];
    is_email_confirmed: boolean;
    solved_problems: UserSolvedProblem[];
    password_reset_tokens: PasswordResetToken[];
    problems_reactions: ProblemReaction[];
    created_at: Date;
    updated_at: Date;
    refresh_token_hash?: string | null;
    constructor(partial: Partial<User>);
}
