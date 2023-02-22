import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(paginationQuery: PaginationQueryDto): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, dto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
}
