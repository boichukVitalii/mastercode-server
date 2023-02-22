import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { CompilerService } from './compiler.service';
import { CreateCompilerDto } from './dto/create-compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';

@Controller('compiler')
export class CompilerController {
	constructor(private readonly compilerService: CompilerService) {}

	@Post()
	async compile(@Body() dto: CreateCompilerDto): Promise<ResponseCompilerDto> {
		try {
			const response = await this.compilerService.compile(dto);
			return response;
		} catch (e) {
			console.error(e);
			throw new InternalServerErrorException();
		}
	}
}
