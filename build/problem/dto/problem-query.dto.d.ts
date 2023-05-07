import { TProblemDifficulty } from '../entities/problem.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
declare const ProblemQueryDto_base: import("@nestjs/common").Type<Partial<PaginationQueryDto>>;
export declare class ProblemQueryDto extends ProblemQueryDto_base {
    category?: string;
    title?: string;
    difficulty?: TProblemDifficulty;
}
export {};
