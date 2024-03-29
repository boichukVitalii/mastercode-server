import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Problem } from './entities/problem.entity';
import { ProblemReaction, TReactionType } from './entities/problem-reaction.entity';
import { EntityNotFoundCustomError } from '../errors/custom-errors';
import { PROBLEM_NOT_FOUND_ERROR } from './problem.constants';
import { ToggleReactionResponseDto } from './dto/toggle-reaction-response.dto';
import { ProblemQueryDto } from './dto/problem-query.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProblemService {
	constructor(
		@InjectRepository(Problem)
		private readonly problemRepository: Repository<Problem>,
		@InjectRepository(ProblemReaction)
		private readonly problemReactionRepository: Repository<ProblemReaction>,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
	) {}

	async create(data: DeepPartial<Problem>): Promise<Problem> {
		const problem = this.problemRepository.create(data);
		return await this.problemRepository.save(problem);
	}

	async findMany(options: ProblemQueryDto): Promise<Problem[]> {
		const { skip, take, category, difficulty, title } = options;
		return await this.problemRepository.find({
			skip: skip,
			take: take,
			where: {
				category: { name: category },
				difficulty,
				title,
			},
			relations: {
				category: true,
			},
		});
	}

	async findOne(where: FindOptionsWhere<Problem>): Promise<Problem | null> {
		return await this.problemRepository.findOneBy(where);
	}

	async findOneOrThrow(where: FindOptionsWhere<Problem>): Promise<Problem> {
		const problem = await this.problemRepository.findOneBy(where);
		if (!problem) throw new EntityNotFoundCustomError(PROBLEM_NOT_FOUND_ERROR);
		return problem;
	}

	async updateOne(where: FindOptionsWhere<Problem>, data: DeepPartial<Problem>): Promise<Problem> {
		const problem = await this.findOneOrThrow(where);
		return await this.problemRepository.save({ ...problem, ...data });
	}

	async remove(where: FindOptionsWhere<Problem>): Promise<Problem> {
		const problem = await this.findOneOrThrow(where);
		return await this.problemRepository.remove(problem);
	}

	async toggleReaction(
		problemId: string,
		userId: string,
		reactionType: TReactionType,
	): Promise<ToggleReactionResponseDto> {
		const existedProblemReaction = await this.problemReactionRepository.findOneBy({
			problem_id: problemId,
			user_id: userId,
		});

		if (existedProblemReaction) {
			await this.problemReactionRepository.remove(existedProblemReaction);

			// user removed previous reaction
			if (reactionType === existedProblemReaction.reaction_type) {
				const problem = await this.countChangedReactionsAndUpdate(
					problemId,
					existedProblemReaction.reaction_type,
				);
				return new ToggleReactionResponseDto(problem);
			}
		}

		const problemReaction = this.problemReactionRepository.create({
			problem_id: problemId,
			user_id: userId,
			reaction_type: reactionType,
		});
		await this.problemReactionRepository.save(problemReaction);
		const problem = await this.countChangedReactionsAndUpdate(
			problemId,
			reactionType,
			existedProblemReaction?.reaction_type,
		);

		return new ToggleReactionResponseDto(problem);
	}

	private async countChangedReactionsAndUpdate(
		problemId: string,
		reactionType: TReactionType,
		removedReactionType?: TReactionType,
	): Promise<Problem> {
		const reactionCount = await this.problemReactionRepository.countBy({
			problem_id: problemId,
			reaction_type: reactionType,
		});
		const problem = await this.updateOne({ id: problemId }, { [reactionType]: reactionCount });
		if (removedReactionType) {
			return await this.updateOne(
				{ id: problemId },
				{ [removedReactionType]: problem[removedReactionType] - 1 },
			);
		}
		return problem;
	}

	async getNumberOfProblemsBy(where: FindOptionsWhere<Problem>): Promise<number> {
		return await this.problemRepository.countBy(where);
	}
}
