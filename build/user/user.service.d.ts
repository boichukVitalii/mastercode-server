import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(dto: CreateUserDto): Promise<User>;
    findAll(paginationQuery: PaginationQueryDto): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    update(id: string, dto: UpdateUserDto): Promise<User | null>;
    remove(id: string): Promise<User | null>;
}
