export enum Verdict {
	Accepted = 'Accepted',
	WrongAnswer = 'Wrong answer',
	Error = 'Error',
}

export class ResponseCompilerDto {
	verdict: Verdict;
	logs: string;
	runTime: string | undefined;
}
