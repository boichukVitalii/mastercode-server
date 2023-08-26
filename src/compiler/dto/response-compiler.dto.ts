export const Verdict = {
	Correct: 'Correct',
	WrongAnswer: 'Wrong answer',
	Timeout: 'Timeout',
	Error: 'Error',
} as const;

export type TVerdict = typeof Verdict[keyof typeof Verdict];

export class ResponseCompilerDto {
	constructor(
		public verdict: TVerdict,
		public info?: string,
		public logs?: string,
		public runTime?: number,
	) {}
}
