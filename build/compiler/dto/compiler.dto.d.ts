import { TLanguage } from '../../user/entities/user-solved-problem.entity';
export type CodeType = {
    type: 'Buffer';
    data: Array<number>;
};
export declare class CompilerDto {
    lang: TLanguage;
    code: CodeType;
    problemId: string;
    submit: boolean;
}
