import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
	@IsOptional()
	@IsPositive()
	@Type(() => Number)
	skip?: number;

	@IsOptional()
	@IsPositive()
	@Type(() => Number)
	take?: number;
}
