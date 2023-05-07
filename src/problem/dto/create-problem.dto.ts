import { IsArray, IsEnum, IsObject, IsString } from 'class-validator';
import { ProblemDifficulty, TProblemDifficulty } from '../entities/problem.entity';

export class CreateProblemDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsEnum(ProblemDifficulty)
	difficulty: TProblemDifficulty;

	@IsString()
	solution: string;

	@IsArray()
	@IsString({ each: true })
	constraints: string[];

	@IsString()
	category_id: number;

	@IsObject()
	inputs: Record<string, any[]>;

	@IsObject()
	outputs: Record<string, any[]>;
}
