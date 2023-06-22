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
	BadRequestException,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { CheckPolicies } from 'src/blocks/decorators/check-policies.decorator';
import { GetCurrentUser } from 'src/blocks/decorators/get-current-user.decorator';
import { PolicyHandler } from 'src/blocks/handlers/policy.handler';
import { Action } from 'src/casl/types/casl-types.type';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PROBLEM_NOT_FOUND_ERROR } from 'src/problem/problem.constants';
import { ProblemService } from 'src/problem/problem.service';
import { User } from 'src/user/entities/user.entity';
import { COMMENTS_NOT_FOUND_ERROR } from './comment.constants';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { ApiTags } from '@nestjs/swagger';
import { TJwtPayload } from 'src/auth/types';
import { UserService } from 'src/user/user.service';
import { GetCurrentUserId } from 'src/blocks/decorators/get-current-userId.decorator';
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
		@GetCurrentUserId() user_id: string,
	): Promise<Comment> {
		const problem = await this.problemService.findOneOrThrow({ id: dto.problemId });
		const user = await this.userService.findOneOrThrow({ id: user_id });
		if (!problem) throw new BadRequestException(PROBLEM_NOT_FOUND_ERROR);
		return this.commentService.create(dto, user, problem);
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
		const comment = await this.commentService.findOneOrThrow({ id });
		return comment;
	}

	@Patch(':id')
	@CheckPolicies(new PolicyHandler(Action.Update, Comment))
	async update(@Param('id') id: string, @Body() dto: UpdateCommentDto): Promise<Comment> {
		const comment = await this.commentService.updateOne({ id }, dto);
		return comment;
	}

	@Delete(':id')
	@CheckPolicies(new PolicyHandler(Action.Delete, Comment))
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id') id: string): Promise<void> {
		await this.commentService.remove({ id });
	}
}
