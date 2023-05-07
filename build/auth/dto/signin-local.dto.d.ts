import { SignupLocalDto } from './signup-local.dto';
declare const SigninLocalDto_base: import("@nestjs/common").Type<Pick<SignupLocalDto, "email">>;
export declare class SigninLocalDto extends SigninLocalDto_base {
    password: string;
}
export {};
