import { ClassConstructor } from 'class-transformer';
import { AppAbility, Entity, IPolicyHandler, TAction } from 'src/casl/types/casl-types.type';
export declare class PolicyHandler implements IPolicyHandler {
    readonly action: TAction;
    readonly entity: ClassConstructor<Entity>;
    constructor(action: TAction, entity: ClassConstructor<Entity>);
    handle(ability: AppAbility, id?: string): Promise<boolean>;
}
