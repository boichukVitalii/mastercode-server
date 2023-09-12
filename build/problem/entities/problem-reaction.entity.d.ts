import { User } from '../../user/entities/user.entity';
import { Problem } from './problem.entity';
export declare const ReactionType: {
    readonly LIKES: "likes";
    readonly DISLIKES: "dislikes";
};
export declare type TReactionType = typeof ReactionType[keyof typeof ReactionType];
export declare class ProblemReaction {
    problem_id: string;
    user_id: string;
    reaction_type: TReactionType;
    problem: Problem;
    user: User;
}
