import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';

@Injectable()
export class ProblemService {
	constructor(@InjectRepository(Problem) private readonly problemRepository: Repository<Problem>) {}

	async create(dto: CreateProblemDto): Promise<Problem> {
		const problem = this.problemRepository.create(dto);
		return this.problemRepository.save(problem);
	}

	async findAll(paginationQuery: PaginationQueryDto): Promise<Problem[]> {
		const { limit, offset } = paginationQuery;
		return this.problemRepository.find({
			skip: offset,
			take: limit,
		});
	}

	async findOne(id: string): Promise<Problem | null> {
		return this.problemRepository.findOneBy({ id });
	}

	async update(id: string, dto: UpdateProblemDto): Promise<Problem | null> {
		const problem = await this.findOne(id);
		if (!problem) return null;
		return this.problemRepository.save({ ...problem, ...dto });
	}

	async remove(id: string): Promise<Problem | null> {
		const problem = await this.findOne(id);
		if (!problem) return null;
		return this.problemRepository.remove(problem);
	}
}
