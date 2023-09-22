import { InferSubjects, MongoAbility } from '@casl/ability';
import { ClassConstructor } from 'class-transformer';
import { Category } from 'src/category/entities/category.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Problem } from 'src/problem/entities/problem.entity';
import { User } from 'src/user/entities/user.entity';
export type Subjects = InferSubjects<typeof Comment | typeof User | typeof Category | typeof Problem> | 'all';
export declare const Action: {
    readonly Manage: "manage";
    readonly Create: "create";
    readonly ReadOne: "read_one";
    readonly ReadMany: "read_many";
    readonly Update: "update";
    readonly Delete: "delete";
};
export type TAction = typeof Action[keyof typeof Action];
export type AppAbility = MongoAbility<[TAction, Subjects]>;
export type FlatComment = Comment & {
    'user.id': Comment['user']['id'];
};
export type Entity = Comment | User | Category | Problem;
export interface IPolicyHandler {
    action: TAction;
    entity: ClassConstructor<Entity>;
    handle(ability: AppAbility, id?: string): Promise<boolean>;
}
