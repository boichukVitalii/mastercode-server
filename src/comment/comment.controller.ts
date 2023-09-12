import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	NotFoundException,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { CheckPolicies } from '../blocks/decorators/check-policies.decorator';
import { PolicyHandler } from '../blocks/handlers/policy.handler';
import { Action } from '../casl/types/casl-types.type';
import { ProblemService } from '../problem/problem.service';
import { COMMENTS_NOT_FOUND_ERROR } from './comment.constants';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { GetCurrentUserId } from '../blocks/decorators/get-current-userId.decorator';
import { CommentQueryDto } from './dto/comment-query.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
	constructor(
		private readonly commentService: CommentService,
		private readonly problemService: ProblemService,
		private readonly userService: UserService,
	) {}

	@Post()
	@CheckPolicies(new PolicyHandler(Action.Create, Comment))
	async create(
		@Body() dto: CreateCommentDto,
		@GetCurrentUserId() userId: string,
	): Promise<Comment> {
		const [problem, user] = await Promise.all([
			this.problemService.findOneOrThrow({ id: dto.problemId }),
			this.userService.findOneOrThrow({ id: userId }),
		]);
		return await this.commentService.create(dto, user, problem);
	}

	@Get()
	@CheckPolicies(new PolicyHandler(Action.ReadMany, Comment))
	async findMany(@Query() query: CommentQueryDto): Promise<Comment[]> {
		const comments = await this.commentService.findMany(query);
		if (!comments.length) throw new NotFoundException(COMMENTS_NOT_FOUND_ERROR);
		return comments;
	}

	@Get(':id')
	@CheckPolicies(new PolicyHandler(Action.ReadOne, Comment))
	async findOne(@Param('id') id: string): Promise<Comment> {
		return await this.commentService.findOneOrThrow({ id });
	}

	@Patch(':id')
	@CheckPolicies(new PolicyHandler(Action.Update, Comment))
	async update(@Param('id') id: string, @Body() dto: UpdateCommentDto): Promise<Comment> {
		return await this.commentService.updateOne({ id }, dto);
	}

	@Delete(':id')
	@CheckPolicies(new PolicyHandler(Action.Delete, Comment))
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id') id: string): Promise<void> {
		await this.commentService.remove({ id });
	}
}
