import { Problem } from '../../problem/entities/problem.entity';
import { User } from '../../user/entities/user.entity';
export declare class Comment {
    id: string;
    text: string;
    user: User;
    problem: Problem;
    created_at: Date;
    updated_at: Date;
}
