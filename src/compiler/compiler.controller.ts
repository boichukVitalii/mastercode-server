import { Controller, Post, Body } from '@nestjs/common';
import { CompilerService } from './compiler.service';
import { CreateCompilerDto } from './dto/create-compiler.dto';

@Controller('compiler')
export class CompilerController {
	constructor(private readonly compilerService: CompilerService) {}

	@Post()
	compile(@Body() dto: CreateCompilerDto) {
		return this.compilerService.compile(dto);
	}
}
