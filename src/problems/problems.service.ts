import { Injectable } from '@nestjs/common';
import { Problem } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Injectable()
export class ProblemsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateProblemDto): Promise<Problem> {
		return this.prisma.problem.create({ data: dto });
	}

	async findAll(): Promise<Problem[]> {
		return this.prisma.problem.findMany();
	}

	async findOne(id: number): Promise<Problem> {
		return this.prisma.problem.findUnique({ where: { id } });
	}

	async update(id: number, dto: UpdateProblemDto): Promise<Problem> {
		return this.prisma.problem.update({
			where: { id },
			data: dto,
		});
	}

	async remove(id: number): Promise<Problem> {
		return this.prisma.problem.delete({ where: { id } });
	}
}
