import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ResponseCompilerDto, Verdict } from './dto/response-compiler.dto';
import { UserService } from '../user/user.service';
import { Compiler } from './compiler.class';
import { COMPILE_QUEUE, TASK_TESTING_PROCESS } from './compiler.constants';
import { TCompilerTestingJob } from './types/compiler.type';

@Processor(COMPILE_QUEUE)
@Injectable()
export class CompilerProcessor {
	constructor(private readonly userService: UserService) {}

	@Process(TASK_TESTING_PROCESS)
	async handleTesting(job: Job<TCompilerTestingJob>): Promise<ResponseCompilerDto> {
		const { code, lang, problemId, submit } = job.data.testingData;
		const compiler = new Compiler(code, lang, job.data.problem);
		const result = await compiler.compile();
		result.runTime = result.runTime ? parseFloat(result.runTime.toFixed(3)) : result.runTime;
		if (submit && result.verdict === Verdict.Correct) {
			await this.userService.addSolvedProblem({
				problem_id: problemId,
				user_id: job.data.userId,
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				run_time: result.runTime!,
				language: lang,
			});
		}
		return result;
	}
}
