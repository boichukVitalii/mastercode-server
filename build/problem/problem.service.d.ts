import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
export declare class ProblemService {
    private readonly problemRepository;
    constructor(problemRepository: Repository<Problem>);
    create(dto: CreateProblemDto): Promise<Problem>;
    findAll(paginationQuery: PaginationQueryDto): Promise<Problem[]>;
    findOne(id: string): Promise<Problem | null>;
    update(id: string, dto: UpdateProblemDto): Promise<Problem | null>;
    remove(id: string): Promise<Problem | null>;
}
