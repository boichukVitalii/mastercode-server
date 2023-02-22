import { IsArray, IsEnum, IsObject, IsString } from 'class-validator';
import { ProblemDifficulty, ProblemDifficultyType } from '../entities/problem.entity';

export class CreateProblemDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsEnum(ProblemDifficulty)
	difficulty: ProblemDifficultyType;

	@IsString()
	solution: string;

	@IsArray()
	@IsString({ each: true })
	constraints: string[];

	@IsString()
	category_id: number;

	@IsObject()
	inputs: JSON;

	@IsObject() //isJson
	outputs: JSON;
}
