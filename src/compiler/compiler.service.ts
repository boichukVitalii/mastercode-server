import { Injectable } from '@nestjs/common';
import { CompilerDto } from './dto/compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
import { ProblemService } from 'src/problem/problem.service';
import { Compiler } from './compiler.class';

@Injectable()
export class CompilerService {
	constructor(private readonly problemService: ProblemService) {}

	async compile({ code, lang, problemId }: CompilerDto): Promise<ResponseCompilerDto> {
		const problem = await this.problemService.findOneOrThrow({ id: problemId });
		const compiler = new Compiler(code, lang, problem);
		return compiler.compile();
	}
}
