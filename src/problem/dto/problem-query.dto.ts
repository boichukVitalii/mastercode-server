import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProblemDifficulty, TProblemDifficulty } from '../entities/problem.entity';
import { PartialType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export class ProblemQueryDto extends PartialType(PaginationQueryDto) {
	@IsOptional()
	@IsString()
	category?: string;

	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsEnum(ProblemDifficulty)
	difficulty?: TProblemDifficulty;
}
