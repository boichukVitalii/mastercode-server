export declare const Verdict: {
    readonly Correct: "Correct";
    readonly WrongAnswer: "Wrong answer";
    readonly Timeout: "Timeout";
    readonly Error: "Error";
};
export type TVerdict = typeof Verdict[keyof typeof Verdict];
export declare class ResponseCompilerDto {
    verdict: TVerdict;
    info?: string | undefined;
    logs?: string | undefined;
    runTime?: number | undefined;
    constructor(verdict: TVerdict, info?: string | undefined, logs?: string | undefined, runTime?: number | undefined);
}
