import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
} from '@nestjs/common';
import { CATEGORY_NOT_FOUND_ERROR } from './category.constants';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	async create(@Body() dto: CreateCategoryDto): Promise<Category> {
		return this.categoryService.create(dto);
	}

	@Get()
	async findAll(): Promise<Category[]> {
		return this.categoryService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Category> {
		const category = await this.categoryService.findOne(id);
		if (!category) throw new NotFoundException(CATEGORY_NOT_FOUND_ERROR);
		return category;
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<Category> {
		const category = await this.categoryService.update(id, dto);
		if (!category) throw new NotFoundException(CATEGORY_NOT_FOUND_ERROR);
		return category;
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<Category> {
		const category = await this.categoryService.remove(id);
		if (!category) throw new NotFoundException(CATEGORY_NOT_FOUND_ERROR);
		return category;
	}
}
