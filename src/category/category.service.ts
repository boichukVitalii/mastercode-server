import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { EntityNotFoundCustomError } from '../errors/custom-errors';
import { CATEGORY_NOT_FOUND_ERROR } from './category.constants';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
	) {}

	async create(data: DeepPartial<Category>): Promise<Category> {
		const category = this.categoryRepository.create(data);
		return await this.categoryRepository.save(category);
	}

	async findMany(options: FindManyOptions<Category>): Promise<Category[]> {
		return await this.categoryRepository.find(options);
	}

	async findOne(where: FindOptionsWhere<Category>): Promise<Category | null> {
		return await this.categoryRepository.findOneBy(where);
	}

	async findOneOrThrow(where: FindOptionsWhere<Category>): Promise<Category> {
		const category = await this.categoryRepository.findOneBy(where);
		if (!category) throw new EntityNotFoundCustomError(CATEGORY_NOT_FOUND_ERROR);
		return category;
	}

	async updateOne(
		where: FindOptionsWhere<Category>,
		data: DeepPartial<Category>,
	): Promise<Category> {
		const category = await this.findOneOrThrow(where);
		return await this.categoryRepository.save({ ...category, ...data });
	}

	async remove(where: FindOptionsWhere<Category>): Promise<Category> {
		const category = await this.findOneOrThrow(where);
		return await this.categoryRepository.remove(category);
	}
}
