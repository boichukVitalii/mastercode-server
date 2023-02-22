import { Module } from '@nestjs/common';
import { CompilerService } from './compiler.service';
import { CompilerController } from './compiler.controller';
import { ProblemModule } from 'src/problem/problem.module';

@Module({
	imports: [ProblemModule],
	controllers: [CompilerController],
	providers: [CompilerService],
})
export class CompilerModule {}
