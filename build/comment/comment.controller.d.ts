import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto): Promise<Comment>;
    findAll(paginationQuery: PaginationQueryDto): Promise<Comment[]>;
    findOne(id: string): Promise<Comment>;
    update(id: string, dto: UpdateCommentDto): Promise<Comment>;
    remove(id: string): Promise<Comment>;
}
