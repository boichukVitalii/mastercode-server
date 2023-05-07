import { ClassConstructor } from 'class-transformer';
import {
	AppAbility,
	Entity,
	IPolicyHandler,
	Subjects,
	TAction,
} from 'src/casl/types/casl-types.type';
import config from 'src/config';

export class PolicyHandler implements IPolicyHandler {
	readonly action: TAction;
	readonly entity: ClassConstructor<Entity>;

	constructor(action: TAction, entity: ClassConstructor<Entity>) {
		this.action = action;
		this.entity = entity;
	}

	async handle(ability: AppAbility, id?: string): Promise<boolean> {
		if (!id) return ability.can(this.action, this.entity as Subjects);
		const dataSource = await config.dataSourceInit;
		const record = await dataSource.getRepository(this.entity).findOneByOrFail({ id });
		return ability.can(this.action, record);
	}
}
