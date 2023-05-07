import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ToggleReactionDto } from './dto/toggle-reaction.dto';
import { ToggleReactionResponseDto } from './dto/toggle-reaction-response.dto';
export declare class ProblemController {
    private readonly problemService;
    constructor(problemService: ProblemService);
    create(dto: CreateProblemDto): Promise<Problem>;
    findMany(query: PaginationQueryDto): Promise<Problem[]>;
    findOne(id: string): Promise<Problem>;
    update(id: string, dto: UpdateProblemDto): Promise<Problem>;
    remove(id: string): Promise<void>;
    toggleReaction({ problem_id, reaction_type }: ToggleReactionDto, userId: string): Promise<ToggleReactionResponseDto>;
}
