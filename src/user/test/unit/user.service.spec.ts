/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user.service';
import {
	DataSource,
	DeepPartial,
	FindManyOptions,
	FindOptionsWhere,
	ObjectLiteral,
	Repository,
} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { createUserStub, createdUserStub } from '../stubs/user.stub';
import { ProblemService } from 'src/problem/problem.service';
import { FileService } from 'src/file/file.service';
import { UserSolvedProblem } from 'src/user/entities/user-solved-problem.entity';
import { Problem } from 'src/problem/entities/problem.entity';
import { ProblemReaction } from 'src/problem/entities/problem-reaction.entity';
import { File } from 'src/file/entities/file.entity';
import { UserQueryDto } from 'src/user/dto/user-query.dto';

type MockRepository<T extends ObjectLiteral = any> = Partial<
	Record<keyof Repository<T>, jest.Mock>
>;
const createMockRepository = <T extends ObjectLiteral = any>(): MockRepository<T> => ({
	findOneBy: jest.fn(),
	find: jest.fn(),
	create: jest.fn().mockImplementation((dto: DeepPartial<T>) => dto),
	save: jest.fn(),
	remove: jest.fn(),
});

describe('UserService Unit', () => {
	let service: UserService;
	let userRepository: MockRepository;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				ProblemService,
				FileService,
				{ provide: DataSource, useValue: {} },
				{ provide: getRepositoryToken(User), useValue: createMockRepository() },
				{ provide: getRepositoryToken(Problem), useValue: createMockRepository() },
				{ provide: getRepositoryToken(ProblemReaction), useValue: createMockRepository() },
				{ provide: getRepositoryToken(File), useValue: createMockRepository() },
				{ provide: getRepositoryToken(UserSolvedProblem), useValue: createMockRepository() },
			],
		}).compile();

		service = module.get<UserService>(UserService);
		userRepository = module.get<MockRepository>(getRepositoryToken(User));
		jest.clearAllMocks();
	});

	describe('create', () => {
		describe('when create is called', () => {
			let user: User;
			let createSpy: jest.SpyInstance;
			let saveSpy: jest.SpyInstance;
			const userDto = createUserStub();
			const createdUser = createdUserStub();

			beforeEach(async () => {
				userRepository.save?.mockImplementation((user: User) => Promise.resolve(createdUser));
				createSpy = jest.spyOn(userRepository, 'create');
				saveSpy = jest.spyOn(userRepository, 'save');
				user = await service.create(userDto);
			});

			it('should call the userRepository', () => {
				expect(createSpy).toHaveBeenCalledWith(userDto);
				expect(saveSpy).toHaveBeenCalledWith(userDto);
			});

			it('should return a user', () => {
				expect(user).toEqual(createdUser);
			});
		});
	});

	describe('findOne', () => {
		describe('when findOne is called', () => {
			let user: User | null;
			const createdUser = createdUserStub();

			describe('when user with such search key exists', () => {
				const where: FindOptionsWhere<User> = { id: createdUser.id };

				beforeEach(async () => {
					userRepository.findOneBy?.mockImplementation((where: FindOptionsWhere<User>) =>
						Promise.resolve(createdUser),
					);
					jest.spyOn(userRepository, 'findOneBy');
					user = await service.findOne(where);
				});

				it('should call the userRepository', () => {
					expect(userRepository.findOneBy).toHaveBeenCalledWith(where);
				});

				it('should return a user', () => {
					expect(user).toEqual(createdUser);
				});
			});

			describe('otherwise', () => {
				const where: FindOptionsWhere<User> = { id: createdUser.id + 'f' };

				beforeEach(async () => {
					userRepository.findOneBy?.mockImplementation((where: FindOptionsWhere<User>) =>
						Promise.resolve(null),
					);
					jest.spyOn(userRepository, 'findOneBy');
					user = await service.findOne(where);
				});

				it('should call the userRepository', () => {
					expect(userRepository.findOneBy).toHaveBeenCalledWith(where);
				});

				it('should return a null', () => {
					expect(user).toBeNull();
				});
			});
		});
	});

	describe('findMany', () => {
		describe('when findMany is called', () => {
			let users: User[];
			const createdUser = createdUserStub();

			describe('when users are found by given options', () => {
				const options: UserQueryDto = { skip: 0, take: 1, email: undefined };

				beforeEach(async () => {
					userRepository.find?.mockImplementation((options: FindManyOptions<User>) =>
						Promise.resolve([createdUser]),
					);
					jest.spyOn(userRepository, 'find');
					users = await service.findMany(options);
				});

				it('should call the userRepository', () => {
					expect(userRepository.find).toHaveBeenCalledWith({
						skip: options.skip,
						take: options.take,
						where: { email: options.email },
					});
				});

				it('should return array with one user', () => {
					expect(users).toEqual([createdUser]);
				});
			});

			describe('otherwise', () => {
				const options: UserQueryDto = { skip: 1, take: 1, email: undefined };

				beforeEach(async () => {
					userRepository.find?.mockImplementation((options: FindManyOptions<User>) =>
						Promise.resolve([]),
					);
					jest.spyOn(userRepository, 'find');
					users = await service.findMany(options);
				});

				it('should call the userRepository', () => {
					expect(userRepository.find).toHaveBeenCalledWith({
						skip: options.skip,
						take: options.take,
						where: { email: options.email },
					});
				});

				it('should return an empty array', () => {
					expect(users.length).toEqual(0);
				});
			});
		});
	});
});
