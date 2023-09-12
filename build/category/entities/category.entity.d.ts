import { Problem } from '../../problem/entities/problem.entity';
export declare class Category {
    id: string;
    name: string;
    additional_info?: string | null;
    problems: Problem[];
}
