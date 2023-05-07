import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsOptional()
	@IsString()
	additional_info?: string;
}
