import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	additional_info?: string;
}
