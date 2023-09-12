import { Comment } from '../../comment/entities/comment.entity';
import { Category } from '../../category/entities/category.entity';
import { ProblemReaction } from './problem-reaction.entity';
import { UserSolvedProblem } from '../../user/entities/user-solved-problem.entity';
export declare const ProblemDifficulty: {
    readonly EASY: "easy";
    readonly MEDIUM: "medium";
    readonly HARD: "hard";
};
export declare type TProblemDifficulty = typeof ProblemDifficulty[keyof typeof ProblemDifficulty];
export declare class Problem {
    id: string;
    title: string;
    description: string;
    difficulty: TProblemDifficulty;
    solution: string;
    likes: number;
    dislikes: number;
    constraints: string[];
    inputs: Record<string, any[]>;
    outputs: Record<string, any[]>;
    category: Category;
    category_id: string;
    comments: Comment[];
    problems_reactions: ProblemReaction[];
    solved_problems: UserSolvedProblem[];
    created_at: Date;
    updated_at: Date;
}
