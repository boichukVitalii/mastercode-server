import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
	@IsString()
	@IsNotEmpty()
	text: string;

	@IsUUID()
	problemId: string;
}
