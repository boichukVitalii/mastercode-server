import { CustomDecorator } from '@nestjs/common';
import { TUserRole } from 'src/user/entities/user.entity';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: TUserRole[]) => CustomDecorator;