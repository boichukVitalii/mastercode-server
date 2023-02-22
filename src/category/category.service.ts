import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
	) {}

	async create(dto: CreateCategoryDto): Promise<Category> {
		const category = this.categoryRepository.create(dto);
		return this.categoryRepository.save(category);
	}

	async findAll(): Promise<Category[]> {
		return this.categoryRepository.find();
	}

	async findOne(id: string): Promise<Category | null> {
		return this.categoryRepository.findOneBy({ id });
	}

	async update(id: string, dto: UpdateCategoryDto): Promise<Category | null> {
		const category = await this.findOne(id);
		if (!category) return null;
		return this.categoryRepository.save({ ...category, ...dto });
	}

	async remove(id: string): Promise<Category | null> {
		const category = await this.findOne(id);
		if (!category) return null;
		return this.categoryRepository.remove(category);
	}
}
