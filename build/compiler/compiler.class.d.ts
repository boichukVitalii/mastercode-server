import { CodeType } from './dto/compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
import { Problem } from 'src/problem/entities/problem.entity';
import { TLanguage } from 'src/user/entities/user-solved-problem.entity';
export declare class Compiler {
    private readonly code;
    private readonly lang;
    private readonly problem;
    private readonly imageName;
    private readonly containerName;
    private readonly dockerCompilerDir;
    private readonly solutionResultDir;
    private readonly solutionFileName;
    private readonly solutionFilePath;
    private readonly testcaseInputsJSON;
    private readonly testcaseOutputsJSON;
    private readonly testcasesInputsFilePath;
    private readonly testcasesOutputsFilePath;
    private readonly uniqueUserSolutionDir;
    private result;
    constructor(code: CodeType, lang: TLanguage, problem: Problem);
    private prepareEnv;
    private clear;
    compile(): Promise<ResponseCompilerDto>;
}
