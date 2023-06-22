import { CompilerDto } from './dto/compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
import { ProblemService } from 'src/problem/problem.service';
import { UserService } from 'src/user/user.service';
export declare class CompilerService {
    private readonly problemService;
    private readonly userService;
    constructor(problemService: ProblemService, userService: UserService);
    compile({ code, lang, problemId, submit }: CompilerDto, userId: string): Promise<ResponseCompilerDto>;
}
