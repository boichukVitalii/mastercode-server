import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum Language {
	Js = 'js',
	Python = 'py',
}

export class CreateCompilerDto {
	@IsEnum(Language)
	lang: Language;

	@IsString()
	code: string;

	@IsOptional()
	@IsBoolean()
	submit?: boolean;

	@IsOptional()
	@IsNumber()
	problemId?: number;
}
