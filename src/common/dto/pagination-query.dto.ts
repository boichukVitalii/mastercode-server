import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
	@IsOptional()
	@IsPositive()
	@Type(() => Number) // check fakenews project + transformobject option in global val_pipe
	limit: number;

	@IsOptional()
	@IsPositive()
	@Type(() => Number)
	offset: number;
}
