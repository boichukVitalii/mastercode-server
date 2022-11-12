import { Injectable } from '@nestjs/common';
import { CreateCompilerDto } from './dto/create-compiler.dto';

@Injectable()
export class CompilerService {
	compile(dto: CreateCompilerDto) {
		return 'This action adds a new compiler';
	}
}
