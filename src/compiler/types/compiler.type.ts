import { CompilerDto } from '../dto/compiler.dto';
import { Problem } from '../../problem/entities/problem.entity';

export type TCompilerTestingJob = {
	testingData: CompilerDto;
	problem: Problem;
	userId: string;
};
