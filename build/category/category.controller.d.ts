import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(dto: CreateCategoryDto): Promise<Category>;
    findMany(query: PaginationQueryDto): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, dto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<Category>;
}
