import { IsEnum, IsUUID } from 'class-validator';
import { ReactionType, TReactionType } from '../entities/problem-reaction.entity';

export class ToggleReactionDto {
	@IsUUID()
	problem_id: string;

	@IsEnum(ReactionType)
	reaction_type: TReactionType;
}
