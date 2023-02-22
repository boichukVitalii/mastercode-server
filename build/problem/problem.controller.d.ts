import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
export declare class ProblemController {
    private readonly problemService;
    constructor(problemService: ProblemService);
    create(dto: CreateProblemDto): Promise<Problem>;
    findAll(paginationQuery: PaginationQueryDto): Promise<Problem[]>;
    findOne(id: string): Promise<Problem>;
    update(id: string, dto: UpdateProblemDto): Promise<Problem>;
    remove(id: string): Promise<Problem>;
}
