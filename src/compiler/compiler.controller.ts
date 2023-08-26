import {
	Controller,
	Post,
	Body,
	Get,
	NotFoundException,
	Param,
	Res,
	HttpStatus,
} from '@nestjs/common';
import { ProblemService } from 'src/problem/problem.service';
import { CompilerDto } from './dto/compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/blocks/decorators/get-current-userId.decorator';
import { InjectQueue } from '@nestjs/bull';
import { Response } from 'express';
import { Queue, JobId } from 'bull';
import { COMPILE_QUEUE, TASK_TESTING_PROCESS } from './compiler.constants';

@ApiTags('compiler')
@Controller('compiler')
export class CompilerController {
	constructor(
		private readonly problemService: ProblemService,
		@InjectQueue(COMPILE_QUEUE) private readonly compilerQueue: Queue,
	) {}

	@Post()
	async compile(
		@Body() dto: CompilerDto,
		@GetCurrentUserId() userId: string,
	): Promise<{ jobId: JobId }> {
		const problem = await this.problemService.findOneOrThrow({ id: dto.problemId });
		const job = await this.compilerQueue.add(TASK_TESTING_PROCESS, {
			dto,
			userId,
			problem,
		});
		return { jobId: job.id };
	}

	@Get('job/:id')
	async getJobResult(
		@Res({ passthrough: true }) res: Response,
		@Param('id') id: string,
	): Promise<ResponseCompilerDto | { message: string }> {
		const job = await this.compilerQueue.getJob(id);
		if (!job) throw new NotFoundException(`Job with ID ${id} not found`);
		const isCompleted = await job.isCompleted();
		if (!isCompleted) {
			res.status(HttpStatus.ACCEPTED);
			return { message: `Job with ID ${id} is not completed yet` };
		}
		await job.remove();
		return job.returnvalue as ResponseCompilerDto; //CompilerJobResultDto
	}
}
