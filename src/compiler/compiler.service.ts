import { Injectable } from '@nestjs/common';
import { CreateCompilerDto } from './dto/create-compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
import { ProblemService } from 'src/problem/problem.service';
import { Compiler } from './compiler.class';

@Injectable()
export class CompilerService {
	constructor(private readonly problemService: ProblemService) {}

	async compile({ code, lang, problemId }: CreateCompilerDto): Promise<ResponseCompilerDto> {
		const problem = await this.problemService.findOne(problemId);
		if (!problem) throw new Error('Problem not found');
		const compiler = new Compiler(code, lang, problem);
		return compiler.compile();
	}
}
