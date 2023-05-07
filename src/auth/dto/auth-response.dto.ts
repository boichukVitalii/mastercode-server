import { Exclude } from 'class-transformer';
import { Comment } from 'src/comment/entities/comment.entity';
import { File } from 'src/file/entities/file.entity';
import { TUserRole, UserRole, User } from 'src/user/entities/user.entity';
import { PasswordResetToken } from '../entities/password-reset-token.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProblemReaction } from 'src/problem/entities/problem-reaction.entity';
import { UserSolvedProblem } from 'src/user/entities/user-solved-problem.entity';

export class AuthResponseDto implements User {
	id: string;

	first_name: string;

	last_name: string;

	email: string;

	@Exclude()
	password_hash: string;

	avatar?: File | null;

	additional_info?: string | null;

	@ApiProperty({ enum: UserRole, isArray: true, default: [UserRole.USER] })
	roles: TUserRole[];

	comments: Comment[];

	is_email_confirmed: boolean;

	solved_problems: UserSolvedProblem[];

	password_reset_tokens: PasswordResetToken[];

	problems_reactions: ProblemReaction[];

	created_at: Date;

	updated_at: Date;

	@Exclude()
	refresh_token_hash?: string | null;

	constructor(partial: Partial<User>) {
		Object.assign(this, partial);
	}
}
