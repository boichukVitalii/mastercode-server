export declare enum Language {
    Js = "js",
    Python = "py"
}
export declare type CodeType = {
    type: 'Buffer';
    data: Array<number>;
};
export declare class CreateCompilerDto {
    lang: Language;
    code: CodeType;
    submit?: boolean;
    problemId: string;
}
