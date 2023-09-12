import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Problem } from '../../problem/entities/problem.entity';

export const Language = {
	JS: 'js',
	PYTHON: 'py',
} as const;

export type TLanguage = typeof Language[keyof typeof Language];

@Entity('user_solved_problem')
export class UserSolvedProblem {
	@PrimaryColumn('uuid')
	problem_id: string;

	@PrimaryColumn('uuid')
	user_id: string;

	@Column('float')
	run_time: number;

	@Column('enum', { enum: Language })
	language: TLanguage;

	@ManyToOne(() => Problem, (problem) => problem.solved_problems, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'problem_id' })
	problem: Problem;

	@ManyToOne(() => User, (user) => user.solved_problems, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User;

	@CreateDateColumn()
	created_at: Date;
}
