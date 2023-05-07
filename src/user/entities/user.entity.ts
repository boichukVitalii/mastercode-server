import { PasswordResetToken } from 'src/auth/entities/password-reset-token.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { File } from 'src/file/entities/file.entity';
import { ProblemReaction } from 'src/problem/entities/problem-reaction.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserSolvedProblem } from './user-solved-problem.entity';

export const UserRole = {
	USER: 'user',
	ADMIN: 'admin',
} as const;

export type TUserRole = typeof UserRole[keyof typeof UserRole];

@Entity('user')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { length: 254 })
	first_name: string;

	@Column('varchar', { length: 254 })
	last_name: string;

	@Column('varchar', { length: 254, unique: true })
	email: string;

	@Column('varchar', { length: 254, nullable: true })
	password_hash?: string | null;

	@JoinColumn({ name: 'avatar_id' })
	@OneToOne(() => File, { nullable: true, onDelete: 'SET NULL' })
	avatar?: File | null;

	@Column('uuid', { nullable: true })
	avatar_id?: string | null;

	@Column('text', { nullable: true })
	additional_info?: string | null;

	@Column('enum', { enum: UserRole, array: true, default: [UserRole.USER] })
	roles: TUserRole[];

	@OneToMany(() => Comment, (comment) => comment.user)
	comments: Comment[];

	@Column({ default: false })
	is_email_confirmed: boolean;

	@OneToMany(() => PasswordResetToken, (token) => token.user)
	password_reset_tokens: PasswordResetToken[];

	@Column('varchar', { length: 254, nullable: true, unique: true })
	google_id?: string | null;

	@OneToMany(() => ProblemReaction, (problemReaction) => problemReaction.user)
	problems_reactions: ProblemReaction[];

	@OneToMany(() => UserSolvedProblem, (solvedProblem) => solvedProblem.user)
	solved_problems: UserSolvedProblem[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column('varchar', { length: 254, nullable: true })
	refresh_token_hash?: string | null;
}
