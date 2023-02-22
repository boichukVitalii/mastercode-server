import { CompilerService } from './compiler.service';
import { CreateCompilerDto } from './dto/create-compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
export declare class CompilerController {
    private readonly compilerService;
    constructor(compilerService: CompilerService);
    compile(dto: CreateCompilerDto): Promise<ResponseCompilerDto>;
}
