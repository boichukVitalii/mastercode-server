import { IsBoolean, IsEnum, IsNumber, IsObject, IsOptional } from 'class-validator';

export enum Language {
	Js = 'js',
	Python = 'py',
}

type CodeType = {
	type: 'Buffer';
	data: Array<number>;
};

export class CreateCompilerDto {
	@IsEnum(Language)
	lang: Language;

	@IsObject()
	code: CodeType;

	@IsOptional()
	@IsBoolean()
	submit?: boolean;

	@IsNumber()
	problemId: number;
}
