import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { CompilerService } from './compiler.service';
import { CompilerDto } from './dto/compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('compiler')
@Controller('compiler')
export class CompilerController {
	constructor(private readonly compilerService: CompilerService) {}

	@Post()
	async compile(@Body() dto: CompilerDto): Promise<ResponseCompilerDto> {
		try {
			return this.compilerService.compile(dto);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
