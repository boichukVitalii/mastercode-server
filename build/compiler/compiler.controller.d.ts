import { CompilerService } from './compiler.service';
import { CompilerDto } from './dto/compiler.dto';
import { ResponseCompilerDto } from './dto/response-compiler.dto';
export declare class CompilerController {
    private readonly compilerService;
    constructor(compilerService: CompilerService);
    compile(dto: CompilerDto, userId: string): Promise<ResponseCompilerDto>;
}
