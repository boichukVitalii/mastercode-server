import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SignupLocalDto } from './signup-local.dto';

export class SigninLocalDto extends PickType(SignupLocalDto, ['email']) {
	@IsString()
	@IsNotEmpty()
	password: string;
}
