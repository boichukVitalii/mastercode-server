export declare const Verdict: {
    readonly Accepted: "Accepted";
    readonly Correct: "Correct";
    readonly WrongAnswer: "Wrong answer";
    readonly Error: "Error";
};
export declare type TVerdict = typeof Verdict[keyof typeof Verdict];
export declare class ResponseCompilerDto {
    verdict: TVerdict;
    logs: string;
    runTime?: string;
    constructor(verdict: TVerdict, logs: string, runTime?: string);
}
