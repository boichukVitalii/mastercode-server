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
	createForUser(user: TJwtPayload): AppAbility {
		const { can, build } = new AbilityBuilder<AppAbility>(
			createMongoAbility as CreateAbility<AppAbility>,
		);

		if (user.roles.includes('admin')) {
			can(Action.ReadOne, 'all');
			can(Action.ReadMany, 'all');
			can(Action.Manage, [Problem, Category]);
			can(Action.Create, Comment);
		} else {
			can([Action.ReadOne, Action.ReadMany], [Problem, Category, Comment]);
			can(Action.Create, Comment);
		}

		can<FlatComment>([Action.Update, Action.Delete], Comment, { 'user.id': user.sub });
		can([Action.Update, Action.ReadOne, Action.Upload, Action.Delete], User, { id: user.sub });

		return build({
			detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
		});
	}
}
