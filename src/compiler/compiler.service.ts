import { Injectable } from '@nestjs/common';
import { CompilerDto } from './dto/compiler.dto';
import { ResponseCompilerDto, Verdict } from './dto/response-compiler.dto';
import { ProblemService } from 'src/problem/problem.service';
import { Compiler } from './compiler.class';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CompilerService {
	constructor(
		private readonly problemService: ProblemService,
		private readonly userService: UserService,
	) {}

	async compile(
		{ code, lang, problemId, submit }: CompilerDto,
		userId: string,
	): Promise<ResponseCompilerDto> {
		const problem = await this.problemService.findOneOrThrow({ id: problemId });
		const compiler = new Compiler(code, lang, problem);
		const result = await compiler.compile();
		if (submit && result.verdict === Verdict.Accepted) {
			await this.userService.addSolvedProblem({
				problem_id: problemId,
				user_id: userId,
				run_time: parseFloat(result.runTime as string),
				language: lang,
			});
		}
		if (!submit && result.verdict === Verdict.Accepted) {
			result.verdict = Verdict.Correct;
		}
		return result;
	}
}
