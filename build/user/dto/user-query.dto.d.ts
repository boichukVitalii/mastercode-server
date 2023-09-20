import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
declare const UserQueryDto_base: import("@nestjs/common").Type<Partial<PaginationQueryDto>>;
export declare class UserQueryDto extends UserQueryDto_base {
    email?: string;
}
export {};
