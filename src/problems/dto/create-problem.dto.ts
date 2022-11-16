import { IsArray, IsEnum, IsObject, IsString } from 'class-validator';
import { ProblemDifficulty } from '../entities/problem.entity';

export class CreateProblemDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsEnum(ProblemDifficulty)
	difficulty: ProblemDifficulty;

	@IsString()
	solution: string;

	@IsArray()
	@IsString({ each: true })
	constraints: string[];

	@IsObject()
	inputs: object;

	@IsObject()
	outputs: object;
}
