import { CompilerDto } from './dto/compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
import { ProblemService } from 'src/problem/problem.service';
export declare class CompilerService {
    private readonly problemService;
    constructor(problemService: ProblemService);
    compile({ code, lang, problemId }: CompilerDto): Promise<ResponseCompilerDto>;
}
