import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { TUserRole } from 'src/user/entities/user.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TUserRole[]): CustomDecorator => SetMetadata(ROLES_KEY, roles);
