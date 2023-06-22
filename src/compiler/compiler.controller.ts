import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { CompilerService } from './compiler.service';
import { CompilerDto } from './dto/compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
import { ApiTags } from '@nestjs/swagger';
import logger from 'src/logger';
import { GetCurrentUserId } from 'src/blocks/decorators/get-current-userId.decorator';

@ApiTags('compiler')
@Controller('compiler')
export class CompilerController {
	constructor(private readonly compilerService: CompilerService) {}

	@Post()
	async compile(
		@Body() dto: CompilerDto,
		@GetCurrentUserId() userId: string,
	): Promise<ResponseCompilerDto> {
		try {
			return this.compilerService.compile(dto, userId);
		} catch (e) {
			logger.error(e);
			throw new InternalServerErrorException();
		}
	}
}
