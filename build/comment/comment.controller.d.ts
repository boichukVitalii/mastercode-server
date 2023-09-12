import { ProblemService } from '../problem/problem.service';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { UserService } from '../user/user.service';
import { CommentQueryDto } from './dto/comment-query.dto';
export declare class CommentController {
    private readonly commentService;
    private readonly problemService;
    private readonly userService;
    constructor(commentService: CommentService, problemService: ProblemService, userService: UserService);
    create(dto: CreateCommentDto, userId: string): Promise<Comment>;
    findMany(query: CommentQueryDto): Promise<Comment[]>;
    findOne(id: string): Promise<Comment>;
    update(id: string, dto: UpdateCommentDto): Promise<Comment>;
    remove(id: string): Promise<void>;
}
