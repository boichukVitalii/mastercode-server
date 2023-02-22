import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
export declare class CommentService {
    private readonly commentRepository;
    constructor(commentRepository: Repository<Comment>);
    create(dto: CreateCommentDto): Promise<Comment>;
    findAll(paginationQuery: PaginationQueryDto): Promise<Comment[]>;
    findOne(id: string): Promise<Comment | null>;
    update(id: string, dto: UpdateCommentDto): Promise<Comment | null>;
    remove(id: string): Promise<Comment | null>;
}
