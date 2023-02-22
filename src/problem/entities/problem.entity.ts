import { Comment } from 'src/comment/entities/comment.entity';
import { Category } from 'src/category/entities/category.entity';

import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

export const ProblemDifficulty = {
	EASY: 'easy',
	MEDIUM: 'medium',
	HARD: 'hard',
} as const;

export type ProblemDifficultyType = typeof ProblemDifficulty[keyof typeof ProblemDifficulty];

@Entity('problem')
export class Problem {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { length: 254, unique: true })
	title: string;

	@Column('text')
	description: string;

	@Column('enum', { enum: ProblemDifficulty })
	difficulty: ProblemDifficultyType;

	@Column('text')
	solution: string;

	@Column('int', { default: 0 })
	likes: number;

	@Column('int', { default: 0 })
	dislikes: number;

	@Column('text', { array: true, default: [] })
	constraints: string[];

	@Column('json')
	inputs: JSON;

	@Column('json')
	outputs: JSON;

	@ManyToOne(() => Category, (category: Category) => category.problems)
	@JoinColumn({ name: 'category_id' })
	category: Category;

	@OneToMany(() => Comment, (comment: Comment) => comment.problem)
	comments: Comment[];

	@ManyToMany(() => User)
	users: User[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
