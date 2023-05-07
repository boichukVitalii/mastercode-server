export class CreateUserDto {
	first_name: string;
	last_name: string;
	email: string;
	additional_info?: string;
	password: string;
}
