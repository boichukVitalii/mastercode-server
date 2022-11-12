import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Injectable()
export class ProblemsService {
	constructor(private readonly prisma: PrismaService) {}

	create(dto: CreateProblemDto) {
		return this.prisma.problem.create({ data: dto });
	}

	findAll() {
		return this.prisma.problem.findMany();
	}

	findOne(id: number) {
		return this.prisma.problem.findUnique({ where: { id } });
	}

	update(id: number, dto: UpdateProblemDto) {
		return this.prisma.problem.update({
			where: { id },
			data: dto,
		});
	}

	remove(id: number) {
		return this.prisma.problem.delete({ where: { id } });
	}
}
