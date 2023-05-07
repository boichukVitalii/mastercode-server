import { User } from 'src/user/entities/user.entity';
import { Problem } from '../../problem/entities/problem.entity';
export declare const Language: {
    readonly JS: "js";
    readonly PYTHON: "py";
};
export declare type TLanguage = typeof Language[keyof typeof Language];
export declare class UserSolvedProblem {
    problem_id: string;
    user_id: string;
    run_time: number;
    language: TLanguage;
    problem: Problem;
    user: User;
    created_at: Date;
}
