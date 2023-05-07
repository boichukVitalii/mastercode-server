import { PickType } from '@nestjs/swagger';
import { SignupLocalDto } from './signup-local.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class NewPasswordDto extends PickType(SignupLocalDto, ['password', 'confirm_password']) {
	@IsString()
	@IsNotEmpty()
	token: string;
}
