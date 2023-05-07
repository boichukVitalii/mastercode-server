import { User } from 'src/user/entities/user.entity';
import { DeepPartial } from 'typeorm';

export const createUserStub = (): DeepPartial<User> => {
	return {
		first_name: 'Ben',
		last_name: 'Drinkwater',
		email: 'example@gmail.com',
		password_hash: '$2y$10$lpijXA4pH5jXcNG1qahBBuEe/cfnSg9Z.bJNUYaKik.wh89jiJpvG',
	};
};

export const createdUserStub = (): DeepPartial<User> => {
	return {
		id: '0324ad4a-f41c-4c39-b652-8f5634561d21',
		first_name: 'Ben',
		last_name: 'Drinkwater',
		avatar_id: null,
		additional_info: null,
		email: 'example@gmail.com',
		password_hash: '$2y$10$lpijXA4pH5jXcNG1qahBBuEe/cfnSg9Z.bJNUYaKik.wh89jiJpvG',
		roles: ['user'],
		is_email_confirmed: false,
		created_at: '2023-03-21T21:41:09.623Z',
		updated_at: '2023-03-29T19:07:01.624Z',
	};
};
