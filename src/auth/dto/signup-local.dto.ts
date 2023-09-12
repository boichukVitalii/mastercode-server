import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsPassword } from '../../blocks/validators/is-password.validator';

const MIN_PASSWORD_LENGTH = 8;

export class SignupLocalDto {
	@IsString()
	@IsNotEmpty()
	first_name: string;

	@IsString()
	@IsNotEmpty()
	last_name: string;

	@IsEmail()
	email: string;

	@IsOptional()
	@IsString()
	additional_info?: string;

	@IsPassword(MIN_PASSWORD_LENGTH)
	password: string;

	@IsString()
	@IsNotEmpty()
	confirm_password: string;
}
