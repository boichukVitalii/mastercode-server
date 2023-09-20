import { User } from '../../entities/user.entity';
import { DeepPartial } from 'typeorm';
import { randomUUID } from 'node:crypto';

export const createUserStub = (): DeepPartial<User> => {
	return {
		first_name: 'Ben',
		last_name: 'Drinkwater',
		email: 'example@gmail.com',
		password_hash: '$2y$10$lpijXA4pH5jXcNG1qahBBuEe/cfnSg9Z.bJNUYaKik.wh89jiJpvG',
	};
};

export const createdUserStub = (): User => {
	return {
		id: randomUUID(),
		first_name: 'Ben',
		last_name: 'Drinkwater',
		avatar_id: null,
		additional_info: null,
		email: 'example@gmail.com',
		password_hash: '$2y$10$lpijXA4pH5jXcNG1qahBBuEe/cfnSg9Z.bJNUYaKik.wh89jiJpvG',
		roles: ['user'],
		is_email_confirmed: false,
		comments: [],
		password_reset_tokens: [],
		problems_reactions: [],
		solved_problems: [],
		created_at: new Date(),
		updated_at: new Date(),
	};
};
