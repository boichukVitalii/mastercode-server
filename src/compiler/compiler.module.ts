import { Module } from '@nestjs/common';
import { CompilerService } from './compiler.service';
import { CompilerController } from './compiler.controller';
import { ProblemModule } from 'src/problem/problem.module';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [ProblemModule, UserModule],
	controllers: [CompilerController],
	providers: [CompilerService],
})
export class CompilerModule {}
