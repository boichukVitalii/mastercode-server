export const Verdict = {
	Accepted: 'Accepted',
	Correct: 'Correct',
	WrongAnswer: 'Wrong answer',
	Error: 'Error',
} as const;

export type TVerdict = typeof Verdict[keyof typeof Verdict];

export class ResponseCompilerDto {
	verdict: TVerdict;
	logs?: string;
	runTime?: string;
}
