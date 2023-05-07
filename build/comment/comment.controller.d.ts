import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ProblemService } from 'src/problem/problem.service';
import { User } from 'src/user/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
export declare class CommentController {
    private readonly commentService;
    private readonly problemService;
    constructor(commentService: CommentService, problemService: ProblemService);
    create(dto: CreateCommentDto, user: User): Promise<Comment>;
    findMany(query: PaginationQueryDto): Promise<Comment[]>;
    findOne(id: string): Promise<Comment>;
    update(id: string, dto: UpdateCommentDto): Promise<Comment>;
    remove(id: string): Promise<void>;
}
