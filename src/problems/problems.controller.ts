import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from '@prisma/client';
import { PROBLEM_NOT_FOUND_ERROR } from './problems.constants';

@Controller('problems')
export class ProblemsController {
	constructor(private readonly problemsService: ProblemsService) {}

	@Post()
	async create(@Body() dto: CreateProblemDto): Promise<Problem> {
		return this.problemsService.create(dto);
	}

	@Get()
	async findAll(): Promise<Problem[]> {
		return this.problemsService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<Problem> {
		const problem = await this.problemsService.findOne(id);
		if (!problem) throw new NotFoundException(PROBLEM_NOT_FOUND_ERROR);
		return problem;
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() dto: UpdateProblemDto): Promise<Problem> {
		return this.problemsService.update(id, dto);
	}

	@Delete(':id')
	async remove(@Param('id') id: number): Promise<Problem> {
		return this.problemsService.remove(id);
	}
}
