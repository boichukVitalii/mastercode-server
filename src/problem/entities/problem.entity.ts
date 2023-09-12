import { Comment } from '../../comment/entities/comment.entity';
import { Category } from '../../category/entities/category.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ProblemReaction } from './problem-reaction.entity';
import { UserSolvedProblem } from '../../user/entities/user-solved-problem.entity';

export const ProblemDifficulty = {
	EASY: 'easy',
	MEDIUM: 'medium',
	HARD: 'hard',
} as const;

export type TProblemDifficulty = typeof ProblemDifficulty[keyof typeof ProblemDifficulty];

@Entity('problem')
export class Problem {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { length: 254, unique: true })
	title: string;

	@Column('text')
	description: string;

	@Column('enum', { enum: ProblemDifficulty })
	difficulty: TProblemDifficulty;

	@Column('text')
	solution: string;

	@Column('int', { default: 0 })
	likes: number;

	@Column('int', { default: 0 })
	dislikes: number;

	@Column('text', { array: true, default: [] })
	constraints: string[];

	@Column('json')
	inputs: Record<string, any[]>;

	@Column('json')
	outputs: Record<string, any[]>;

	@ManyToOne(() => Category, (category) => category.problems)
	@JoinColumn({ name: 'category_id' })
	category: Category;

	@Column('uuid')
	category_id: string;

	@OneToMany(() => Comment, (comment) => comment.problem)
	comments: Comment[];

	@OneToMany(() => ProblemReaction, (problemReaction) => problemReaction.problem)
	problems_reactions: ProblemReaction[];

	@OneToMany(() => UserSolvedProblem, (solvedProblem) => solvedProblem.problem)
	solved_problems: UserSolvedProblem[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
