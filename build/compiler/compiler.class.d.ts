import { Problem } from '../problem/entities/problem.entity';
import { TLanguage } from '../user/entities/user-solved-problem.entity';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
import { CodeType } from './dto/compiler.dto';
export declare class Compiler {
    private readonly code;
    private readonly lang;
    private readonly problem;
    private readonly imageName;
    private readonly containerName;
    private readonly dockerCompilerDir;
    private readonly uniqueUserSolutionDockerImgDir;
    private readonly solutionResultDirInDockerImgDir;
    private readonly solutionResultDirInDocker;
    private readonly solutionResultDirInHostFS;
    private readonly solutionResultFileInHostFS;
    private readonly solutionFileName;
    private readonly solutionFilePath;
    private readonly testcasesInputsJSON;
    private readonly testcasesOutputsJSON;
    private readonly testcasesInputsFilePath;
    private readonly testcasesOutputsFilePath;
    private result;
    constructor(code: CodeType, lang: TLanguage, problem: Problem);
    private prepareEnv;
    private clear;
    compile(): Promise<ResponseCompilerDto>;
}
