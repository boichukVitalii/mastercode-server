import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Controller('problems')
export class ProblemsController {
	constructor(private readonly problemsService: ProblemsService) {}

	@Post()
	create(@Body() dto: CreateProblemDto) {
		return this.problemsService.create(dto);
	}

	@Get()
	findAll() {
		return this.problemsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.problemsService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateProblemDto) {
		return this.problemsService.update(+id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.problemsService.remove(id);
	}
}
