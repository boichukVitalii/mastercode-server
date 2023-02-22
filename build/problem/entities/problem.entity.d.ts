import { Comment } from 'src/comment/entities/comment.entity';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
export declare const ProblemDifficulty: {
    readonly EASY: "easy";
    readonly MEDIUM: "medium";
    readonly HARD: "hard";
};
export declare type ProblemDifficultyType = typeof ProblemDifficulty[keyof typeof ProblemDifficulty];
export declare class Problem {
    id: string;
    title: string;
    description: string;
    difficulty: ProblemDifficultyType;
    solution: string;
    likes: number;
    dislikes: number;
    constraints: string[];
    inputs: JSON;
    outputs: JSON;
    category: Category;
    comments: Comment[];
    users: User[];
    created_at: Date;
    updated_at: Date;
}
