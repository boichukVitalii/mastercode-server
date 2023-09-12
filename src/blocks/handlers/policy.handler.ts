import { ClassConstructor } from 'class-transformer';
import {
	AppAbility,
	Entity,
	IPolicyHandler,
	Subjects,
	TAction,
} from '../../casl/types/casl-types.type';
import config from '../../config';

export class PolicyHandler implements IPolicyHandler {
	constructor(public readonly action: TAction, public readonly entity: ClassConstructor<Entity>) {}

	async handle(ability: AppAbility, id?: string): Promise<boolean> {
		if (!id) return ability.can(this.action, this.entity as Subjects);
		const dataSource = await config.dataSourceInit;
		const record = await dataSource.getRepository(this.entity).findOneByOrFail({ id });
		return ability.can(this.action, record);
	}
}
