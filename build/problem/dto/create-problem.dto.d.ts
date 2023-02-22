import { ProblemDifficultyType } from '../entities/problem.entity';
export declare class CreateProblemDto {
    title: string;
    description: string;
    difficulty: ProblemDifficultyType;
    solution: string;
    constraints: string[];
    category_id: number;
    inputs: JSON;
    outputs: JSON;
}
