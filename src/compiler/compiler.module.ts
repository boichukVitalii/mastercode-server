import { Module } from '@nestjs/common';
import { CompilerController } from './compiler.controller';
import { ProblemModule } from 'src/problem/problem.module';
import { UserModule } from 'src/user/user.module';
import { BullModule } from '@nestjs/bull';
import { CompilerProcessor } from './compiler.processor';
import { COMPILE_QUEUE } from './compiler.constants';

@Module({
	imports: [
		ProblemModule,
		UserModule,
		BullModule.registerQueue({
			name: COMPILE_QUEUE,
		}),
	],
	controllers: [CompilerController],
	providers: [CompilerProcessor],
})
export class CompilerModule {}
