import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';
import { ProblemReaction } from './entities/problem-reaction.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Problem, ProblemReaction])],
	controllers: [ProblemController],
	providers: [ProblemService],
	exports: [ProblemService],
})
export class ProblemModule {}
