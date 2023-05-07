import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Problem } from './problem.entity';

export const ReactionType = {
	LIKES: 'likes',
	DISLIKES: 'dislikes',
} as const;

export type TReactionType = typeof ReactionType[keyof typeof ReactionType];

@Entity('problem_reaction')
export class ProblemReaction {
	@PrimaryColumn('uuid')
	problem_id: string;

	@PrimaryColumn('uuid')
	user_id: string;

	@Column('enum', { enum: ReactionType })
	reaction_type: TReactionType;

	@ManyToOne(() => Problem, (problem) => problem.problems_reactions, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'problem_id' })
	problem: Problem;

	@ManyToOne(() => User, (user) => user.problems_reactions, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User;
}
