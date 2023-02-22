import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
	constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

	async create(dto: CreateCommentDto): Promise<Comment> {
		const comment = this.commentRepository.create(dto);
		return this.commentRepository.save(comment);
	}

	async findAll(paginationQuery: PaginationQueryDto): Promise<Comment[]> {
		const { limit, offset } = paginationQuery;
		return this.commentRepository.find({
			skip: offset,
			take: limit,
		});
	}

	async findOne(id: string): Promise<Comment | null> {
		return this.commentRepository.findOneBy({ id });
	}

	async update(id: string, dto: UpdateCommentDto): Promise<Comment | null> {
		const comment = await this.findOne(id);
		if (!comment) return null;
		return this.commentRepository.save({ ...comment, ...dto });
	}

	async remove(id: string): Promise<Comment | null> {
		const comment = await this.findOne(id);
		if (!comment) return null;
		return this.commentRepository.remove(comment);
	}
}
