import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresErrCodes } from '../../../common/db/postrges-error-codes';
import { User } from '../../entities/user.entity';
import { UserModule } from '../../user.module';
import { UserService } from '../../user.service';
import { createUserStub } from '../stubs/user.stub';
import config from '../../../config';
import { EntityNotFoundCustomError } from '../../../errors/custom-errors';
import { ProblemService } from '../../../problem/problem.service';
import { createProblemStub } from '../../../problem/test/stubs/problem.stub';
import { Problem } from '../../../problem/entities/problem.entity';
import { CategoryService } from '../../../category/category.service';
import { CategoryModule } from '../../../category/category.module';

describe('UserService Integration', () => {
	let userService: UserService;
	let problemService: ProblemService;
	let categoryService: CategoryService;

	let user: User;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UserModule, CategoryModule, TypeOrmModule.forRoot({ ...config.dbTestConfig })],
		}).compile();

		userService = moduleFixture.get(UserService);
		problemService = moduleFixture.get(ProblemService);
		categoryService = moduleFixture.get(CategoryService);
	});

	describe('createUser()', () => {
		const userDto = createUserStub();

		it('should create user', async () => {
			user = await userService.create(userDto);
			expect(user.first_name).toBe(userDto.first_name);
			expect(user.last_name).toBe(userDto.last_name);
			expect(user.email).toBe(userDto.email);
			expect(user.is_email_confirmed).toBe(false);
			expect(user.roles).toEqual(['user']);
		});

		it('should throw on duplicate email', async () => {
			await userService
				.create(userDto)
				.then((user) => expect(user).toBeUndefined())
				.catch((error) => expect(error.code).toBe(PostgresErrCodes.UNIQUE_VIOLETION));
		});
	});

	describe('updateUser()', () => {
		it('should update user', async () => {
			const updatedUser = await userService.updateOne(
				{ id: user.id },
				{
					additional_info: 'Some additional info',
					is_email_confirmed: true,
				},
			);
			expect(updatedUser.email).toBe(user.email);
			expect(updatedUser.additional_info).toBe('Some additional info');
			expect(updatedUser.is_email_confirmed).toBe(true);
		});

		it('should throw on not found user', async () => {
			const id = '1' + user.id.slice(1);
			await userService
				.updateOne({ id }, { is_email_confirmed: true })
				.then((user) => expect(user).toBeUndefined())
				.catch((error) => expect(error).toBeInstanceOf(EntityNotFoundCustomError));
		});
	});

	describe('findUser()', () => {
		it('should find user', async () => {
			const foundUser = await userService.findOne({ id: user.id });
			expect(foundUser?.email).toBe(user.email);
		});

		it('user should be null', async () => {
			const id = '1' + user.id.slice(1);
			await userService.findOne({ id }).then((user) => expect(user).toBeNull());
		});
	});

	describe('addSolvedProblem()', () => {
		const problemDto = createProblemStub();
		let problem: Problem;

		beforeAll(async () => {
			const category = await categoryService.create({ name: 'Optimization' });
			problem = await problemService.create({ ...problemDto, category_id: category.id });
		});

		it('should add solved problem', async () => {
			await userService.addSolvedProblem({
				user_id: user.id,
				problem_id: problem.id,
				language: 'js',
				run_time: 0.003,
			});

			const solvedProblem = (await userService.getSolvedProblems(user.id))[0];
			expect(solvedProblem.problem_id).toBe(problem.id);
		});
	});

	describe('getUserStatistics()', () => {
		it('should get user stats', async () => {
			const stats = await userService.getUserStatistics(user.id);
			expect(stats.numberOfSolvedProblems).toBe(1);
		});
	});

	describe('getUserAvatar()', () => {
		it('should return null', async () => {
			const avatar = await userService.getUserAvatar(user.id);
			expect(avatar).toBeNull();
		});
	});
});
