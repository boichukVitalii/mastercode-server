import { TProblemDifficulty } from '../entities/problem.entity';
export declare class CreateProblemDto {
    title: string;
    description: string;
    difficulty: TProblemDifficulty;
    solution: string;
    constraints: string[];
    category_id: number;
    inputs: Record<string, any[]>;
    outputs: Record<string, any[]>;
}
