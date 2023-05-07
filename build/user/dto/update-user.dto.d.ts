import { SignupLocalDto } from 'src/auth/dto/signup-local.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<SignupLocalDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    refresh_token_hash?: string;
}
export {};
