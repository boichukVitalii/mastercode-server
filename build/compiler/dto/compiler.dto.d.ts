import { TLanguage } from 'src/user/entities/user-solved-problem.entity';
export declare type CodeType = {
    type: 'Buffer';
    data: Array<number>;
};
export declare class CompilerDto {
    lang: TLanguage;
    code: CodeType;
    problemId: string;
    submit: boolean;
}
