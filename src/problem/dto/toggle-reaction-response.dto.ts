import { Problem } from '../entities/problem.entity';

export class ToggleReactionResponseDto {
	likes: number;
	dislikes: number;

	constructor(problem: Problem) {
		this.likes = problem.likes;
		this.dislikes = problem.dislikes;
	}
}
