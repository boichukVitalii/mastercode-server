import { Comment } from 'src/comment/entities/comment.entity';
import { Problem } from 'src/problem/entities/problem.entity';
export declare const UserRole: {
    readonly USER: "user";
    readonly ADMIN: "admin";
};
export declare type UserRoleType = typeof UserRole[keyof typeof UserRole];
export declare class User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    avatar: string;
    additional_info: string;
    roles: UserRoleType[];
    comments: Comment[];
    problems_history: Problem[];
    created_at: Date;
    updated_at: Date;
    refresh_token_hash: string;
}
