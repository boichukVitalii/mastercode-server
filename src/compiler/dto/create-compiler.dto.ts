import { IsBoolean, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';

export enum Language {
	Js = 'js',
	Python = 'py',
}

export type CodeType = {
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

	@IsString()
	problemId: string;
}
