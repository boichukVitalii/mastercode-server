import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from 'src/problem/entities/problem.entity';
import { User } from 'src/user/entities/user.entity';
import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { EntityNotFoundCustomError } from 'src/errors/custom-errors';
import { COMMENT_NOT_FOUND_ERROR } from './comment.constants';

@Injectable()
export class CommentService {
	constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

	async create(data: DeepPartial<Comment>, user: User, problem: Problem): Promise<Comment> {
		const comment = this.commentRepository.create({ ...data, user, problem });
		return this.commentRepository.save(comment);
	}

	async findMany(options: FindManyOptions<Comment>): Promise<Comment[]> {
		return this.commentRepository.find(options);
	}

	async findOne(where: FindOptionsWhere<Comment>): Promise<Comment | null> {
		return this.commentRepository.findOneBy(where);
	}

	async findOneOrThrow(where: FindOptionsWhere<Comment>): Promise<Comment> {
		const comment = await this.commentRepository.findOneBy(where);
		if (!comment) throw new EntityNotFoundCustomError(COMMENT_NOT_FOUND_ERROR);
		return comment;
	}

	async updateOne(where: FindOptionsWhere<User>, data: DeepPartial<Comment>): Promise<Comment> {
		const comment = await this.findOneOrThrow(where);
		return this.commentRepository.save({ ...comment, ...data });
	}

	async remove(where: FindOptionsWhere<Comment>): Promise<Comment> {
		const comment = await this.findOneOrThrow(where);
		return this.commentRepository.remove(comment);
	}
}
