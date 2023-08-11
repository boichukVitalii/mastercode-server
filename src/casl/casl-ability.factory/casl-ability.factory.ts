import {
	AbilityBuilder,
	ExtractSubjectType,
	createMongoAbility,
	CreateAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { TJwtPayload } from 'src/auth/types';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Problem } from 'src/problem/entities/problem.entity';
import { Action, AppAbility, FlatComment, Subjects } from '../types/casl-types.type';

@Injectable()
export class CaslAbilityFactory {
	createForUser(user: TJwtPayload, paramsId?: string): AppAbility {
		const { can, build } = new AbilityBuilder<AppAbility>(
			createMongoAbility as CreateAbility<AppAbility>,
		);

		if (user.roles.includes('admin')) {
			can(Action.Manage, [Problem, Category]);
		}

		if (paramsId && paramsId === user.sub) {
			can([Action.Update, Action.Delete], User);
		}

		can([Action.ReadOne, Action.ReadMany], 'all');
		can(Action.Create, Comment);
		can<FlatComment>([Action.Update, Action.Delete], Comment, { 'user.id': user.sub });

		return build({
			detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
		});
	}
}
