import { Problem } from 'src/problem/entities/problem.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Comment {
    id: string;
    text: string;
    user: User;
    problem: Problem;
    created_at: Date;
    updated_at: Date;
}
