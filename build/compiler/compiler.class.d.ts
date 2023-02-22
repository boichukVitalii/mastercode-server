import { CodeType, Language } from './dto/create-compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
import { Problem } from 'src/problem/entities/problem.entity';
export declare class Compiler {
    private readonly code;
    private readonly lang;
    private readonly problem;
    private readonly imageName;
    private readonly containerName;
    private readonly dockerCompilerDir;
    private readonly appFileName;
    private readonly appFilePath;
    private readonly testcaseInputsJSON;
    private readonly testcaseOutputsJSON;
    private readonly testcasesInputsFilePath;
    private readonly testcasesOutputsFilePath;
    private readonly result;
    constructor(code: CodeType, lang: Language, problem: Problem);
    private prepareEnv;
    compile(): Promise<ResponseCompilerDto>;
}
