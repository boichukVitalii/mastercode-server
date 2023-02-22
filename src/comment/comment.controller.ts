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
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { COMMENT_NOT_FOUND_ERROR } from './comment.constants';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Post()
	async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
		return this.commentService.create(createCommentDto);
	}

	@Get()
	async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Comment[]> {
		return this.commentService.findAll(paginationQuery);
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Comment> {
		const comment = await this.commentService.findOne(id);
		if (!comment) throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		return comment;
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateCommentDto): Promise<Comment> {
		const comment = await this.commentService.update(id, dto);
		if (!comment) throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		return comment;
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<Comment> {
		const comment = await this.commentService.remove(id);
		if (!comment) throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		return comment;
	}
}
