import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
	Query,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { PROBLEM_NOT_FOUND_ERROR } from './problem.constants';
import { Problem } from './entities/problem.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('problems')
export class ProblemController {
	constructor(private readonly problemService: ProblemService) {}

	@Post()
	async create(@Body() dto: CreateProblemDto): Promise<Problem> {
		return this.problemService.create(dto);
	}

	@Get()
	async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Problem[]> {
		return this.problemService.findAll(paginationQuery);
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Problem> {
		const problem = await this.problemService.findOne(id);
		if (!problem) throw new NotFoundException(PROBLEM_NOT_FOUND_ERROR);
		return problem;
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateProblemDto): Promise<Problem> {
		const problem = await this.problemService.update(id, dto);
		if (!problem) throw new NotFoundException(PROBLEM_NOT_FOUND_ERROR);
		return problem;
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<Problem> {
		const problem = await this.problemService.remove(id);
		if (!problem) throw new NotFoundException(PROBLEM_NOT_FOUND_ERROR);
		return problem;
	}
}
