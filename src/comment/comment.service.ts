import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from '../problem/entities/problem.entity';
import { User } from '../user/entities/user.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { EntityNotFoundCustomError } from '../errors/custom-errors';
import { COMMENT_NOT_FOUND_ERROR } from './comment.constants';
import { CommentQueryDto } from './dto/comment-query.dto';

@Injectable()
export class CommentService {
	constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

	async create(data: DeepPartial<Comment>, user: User, problem: Problem): Promise<Comment> {
		const comment = this.commentRepository.create({
			...data,
			user,
			problem: {
				id: problem.id,
			},
		});
		return await this.commentRepository.save(comment);
	}

	async findMany(options: CommentQueryDto): Promise<Comment[]> {
		const { skip, take, problem_id } = options;
		return await this.commentRepository.find({
			skip,
			take,
			where: {
				problem: {
					id: problem_id,
				},
			},
		});
	}

	async findOne(where: FindOptionsWhere<Comment>): Promise<Comment | null> {
		return await this.commentRepository.findOneBy(where);
	}

	async findOneOrThrow(where: FindOptionsWhere<Comment>): Promise<Comment> {
		const comment = await this.commentRepository.findOneBy(where);
		if (!comment) throw new EntityNotFoundCustomError(COMMENT_NOT_FOUND_ERROR);
		return comment;
	}

	async updateOne(where: FindOptionsWhere<User>, data: DeepPartial<Comment>): Promise<Comment> {
		const comment = await this.findOneOrThrow(where);
		return await this.commentRepository.save({ ...comment, ...data });
	}

	async remove(where: FindOptionsWhere<Comment>): Promise<Comment> {
		const comment = await this.findOneOrThrow(where);
		return await this.commentRepository.remove(comment);
	}
}
