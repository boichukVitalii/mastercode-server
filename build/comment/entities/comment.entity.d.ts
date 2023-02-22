import { Problem } from 'src/problem/entities/problem.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Comment {
    id: string;
    text: string;
    thumbs_up: number;
    user: User;
    problem: Problem;
    created_at: Date;
    updated_at: Date;
}
