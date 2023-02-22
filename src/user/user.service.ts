import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

	async create(dto: CreateUserDto): Promise<User> {
		const user = this.userRepository.create(dto);
		return this.userRepository.save(user);
	}

	async findAll(paginationQuery: PaginationQueryDto): Promise<User[]> {
		const { limit, offset } = paginationQuery;
		return this.userRepository.find({
			skip: offset,
			take: limit,
		});
	}

	async findOne(id: string): Promise<User | null> {
		return this.userRepository.findOneBy({ id });
	}

	async update(id: string, dto: UpdateUserDto): Promise<User | null> {
		const user = await this.findOne(id);
		if (!user) return null;
		return this.userRepository.save({ ...user, ...dto });
	}

	async remove(id: string): Promise<User | null> {
		const user = await this.findOne(id);
		if (!user) return null;
		return this.userRepository.remove(user);
	}
}
