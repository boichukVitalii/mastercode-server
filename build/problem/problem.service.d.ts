import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Problem } from './entities/problem.entity';
import { ProblemReaction, TReactionType } from './entities/problem-reaction.entity';
import { ToggleReactionResponseDto } from './dto/toggle-reaction-response.dto';
import { ProblemQueryDto } from './dto/problem-query.dto';
import { Cache } from 'cache-manager';
export declare class ProblemService {
    private readonly problemRepository;
    private readonly problemReactionRepository;
    private readonly cacheManager;
    constructor(problemRepository: Repository<Problem>, problemReactionRepository: Repository<ProblemReaction>, cacheManager: Cache);
    create(data: DeepPartial<Problem>): Promise<Problem>;
    findMany(options: ProblemQueryDto): Promise<Problem[]>;
    findOne(where: FindOptionsWhere<Problem>): Promise<Problem | null>;
    findOneOrThrow(where: FindOptionsWhere<Problem>): Promise<Problem>;
    updateOne(where: FindOptionsWhere<Problem>, data: DeepPartial<Problem>): Promise<Problem>;
    remove(where: FindOptionsWhere<Problem>): Promise<Problem>;
    toggleReaction(problemId: string, userId: string, reactionType: TReactionType): Promise<ToggleReactionResponseDto>;
    private countChangedReactionsAndUpdate;
    getNumberOfProblemsBy(where: FindOptionsWhere<Problem>): Promise<number>;
}
