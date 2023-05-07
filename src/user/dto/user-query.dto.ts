import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export class UserQueryDto extends PartialType(PaginationQueryDto) {
	@IsOptional()
	@IsEmail()
	email?: string;
}
