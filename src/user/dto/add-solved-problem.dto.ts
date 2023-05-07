import { TLanguage } from '../entities/user-solved-problem.entity';

export class AddSolvedProblemDto {
	problem_id: string;
	user_id: string;
	run_time: number;
	language: TLanguage;
}
