import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
	Query,
} from '@nestjs/common';
import { CheckPolicies } from '../blocks/decorators/check-policies.decorator';
import { PolicyHandler } from '../blocks/handlers/policy.handler';
import { Action } from '../casl/types/casl-types.type';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CATEGORIES_NOT_FOUND_ERROR } from './category.constants';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@CheckPolicies(new PolicyHandler(Action.Create, Category))
	async create(@Body() dto: CreateCategoryDto): Promise<Category> {
		return await this.categoryService.create(dto);
	}

	@Get()
	@CheckPolicies(new PolicyHandler(Action.ReadMany, Category))
	async findMany(@Query() query: PaginationQueryDto): Promise<Category[]> {
		const categories = await this.categoryService.findMany(query);
		if (!categories.length) throw new NotFoundException(CATEGORIES_NOT_FOUND_ERROR);
		return categories;
	}

	@Get(':id')
	@CheckPolicies(new PolicyHandler(Action.ReadOne, Category))
	async findOne(@Param('id') id: string): Promise<Category> {
		return await this.categoryService.findOneOrThrow({ id });
	}

	@Patch(':id')
	@CheckPolicies(new PolicyHandler(Action.Update, Category))
	async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<Category> {
		return await this.categoryService.updateOne({ id }, dto);
	}

	@Delete(':id')
	@CheckPolicies(new PolicyHandler(Action.Delete, Category))
	async remove(@Param('id') id: string): Promise<Category> {
		return await this.categoryService.remove({ id });
	}
}
