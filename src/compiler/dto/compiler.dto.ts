import { IsBoolean, IsEnum, IsObject, IsString } from 'class-validator';
import { Language, TLanguage } from 'src/user/entities/user-solved-problem.entity';

export type CodeType = {
	type: 'Buffer';
	data: Array<number>;
};

export class CompilerDto {
	@IsEnum(Language)
	lang: TLanguage;

	@IsObject()
	code: CodeType;

	@IsString()
	problemId: string;

	@IsBoolean()
	submit: boolean;
}
