export declare enum Verdict {
    Accepted = "Accepted",
    WrongAnswer = "Wrong answer",
    Error = "Error"
}
export declare class ResponseCompilerDto {
    verdict: Verdict;
    logs: string;
    runTime: string | undefined;
}
