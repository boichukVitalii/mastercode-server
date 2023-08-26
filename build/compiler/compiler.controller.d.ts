import { ProblemService } from 'src/problem/problem.service';
import { CompilerDto } from './dto/compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
import { Response } from 'express';
import { Queue, JobId } from 'bull';
export declare class CompilerController {
    private readonly problemService;
    private readonly compilerQueue;
    constructor(problemService: ProblemService, compilerQueue: Queue);
    compile(dto: CompilerDto, userId: string): Promise<{
        jobId: JobId;
    }>;
    getJobResult(res: Response, id: string): Promise<ResponseCompilerDto | {
        message: string;
    }>;
}
