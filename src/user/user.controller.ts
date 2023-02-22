import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { USER_NOT_FOUND_ERROR } from './user.constants';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<User[]> {
		return this.userService.findAll(paginationQuery);
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<User> {
		const user = await this.userService.findOne(id);
		if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);
		return user;
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
		const user = await this.userService.update(id, dto);
		if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);
		return user;
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<User> {
		const user = await this.userService.remove(id);
		if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);
		return user;
	}
}
