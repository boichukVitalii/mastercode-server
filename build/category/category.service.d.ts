import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(data: DeepPartial<Category>): Promise<Category>;
    findMany(options: FindManyOptions<Category>): Promise<Category[]>;
    findOne(where: FindOptionsWhere<Category>): Promise<Category | null>;
    findOneOrThrow(where: FindOptionsWhere<Category>): Promise<Category>;
    updateOne(where: FindOptionsWhere<Category>, data: DeepPartial<Category>): Promise<Category>;
    remove(where: FindOptionsWhere<Category>): Promise<Category>;
}
