import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class CommentQueryDto extends PartialType(PaginationQueryDto) {
	@IsOptional()
	@IsString()
	problem_id?: string;
}
