import { Problem } from '../entities/problem.entity';
export declare class ToggleReactionResponseDto {
    likes: number;
    dislikes: number;
    constructor(problem: Problem);
}
