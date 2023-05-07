import { Problem } from 'src/problem/entities/problem.entity';
import { User } from 'src/user/entities/user.entity';
import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
export declare class CommentService {
    private readonly commentRepository;
    constructor(commentRepository: Repository<Comment>);
    create(data: DeepPartial<Comment>, user: User, problem: Problem): Promise<Comment>;
    findMany(options: FindManyOptions<Comment>): Promise<Comment[]>;
    findOne(where: FindOptionsWhere<Comment>): Promise<Comment | null>;
    findOneOrThrow(where: FindOptionsWhere<Comment>): Promise<Comment>;
    updateOne(where: FindOptionsWhere<User>, data: DeepPartial<Comment>): Promise<Comment>;
    remove(where: FindOptionsWhere<Comment>): Promise<Comment>;
}
