import { Comment } from 'src/comment/entities/comment.entity';
import { Problem } from 'src/problem/entities/problem.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export const UserRole = {
	USER: 'user',
	ADMIN: 'admin',
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];

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

	@Column('varchar', { length: 254 })
	password_hash: string;

	@Column('varchar', { length: 254, nullable: true })
	avatar: string;

	@Column('text', { nullable: true })
	additional_info: string;

	@Column('enum', { enum: UserRole, array: true, default: [UserRole.USER] })
	roles: UserRoleType[];

	@OneToMany(() => Comment, (comment: Comment) => comment.user)
	comments: Comment[];

	@ManyToMany(() => Problem)
	@JoinTable({
		name: 'user_problem_history',
		joinColumn: {
			name: 'user',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'problem',
			referencedColumnName: 'id',
		},
	})
	problems_history: Problem[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column('varchar', { length: 254 })
	refresh_token_hash: string;
}
