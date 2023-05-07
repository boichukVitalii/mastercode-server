import { SignupLocalDto } from './signup-local.dto';
declare const NewPasswordDto_base: import("@nestjs/common").Type<Pick<SignupLocalDto, "password" | "confirm_password">>;
export declare class NewPasswordDto extends NewPasswordDto_base {
    token: string;
}
export {};
