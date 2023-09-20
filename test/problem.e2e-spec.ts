import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import config from '../src/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProblemDto } from '../src/problem/dto/create-problem.dto';
import { createProblemStub } from '../src/problem/test/stubs/problem.stub';
import { AuthService } from '../src/auth/auth.service';
import { ProblemModule } from '../src/problem/problem.module';
import { APP_GUARD, HttpAdapterHost } from '@nestjs/core';
import { AccessTokenGuard } from '../src/blocks/guards/access-token.guard';
import { AuthModule } from '../src/auth/auth.module';
import { CategoryService } from '../src/category/category.service';
import { CategoryModule } from '../src/category/category.module';
import { Problem } from '../src/problem/entities/problem.entity';
import { GlobalExceptionFilter } from '../src/blocks/filters/global-exceptions.filter';
import { ToggleReactionDto } from '../src/problem/dto/toggle-reaction.dto';
import { validationPipeOptions } from '../src/common/config-options/config-options';
import { EmailConfirmationGuard } from '../src/blocks/guards/email-confirmation.guard';
import { PoliciesGuard } from '../src/blocks/guards/policies.guard';
import { CaslModule } from '../src/casl/casl.module';
import { ToggleReactionResponseDto } from '../src/problem/dto/toggle-reaction-response.dto';
import { PROBLEM_NOT_FOUND_ERROR } from '../src/problem/problem.constants';
import { NO_ADD_INFO_ABOUT_ERROR_MSG } from '../src/blocks/filters/filter.constants';
import { TFilterResponseBody } from '../src/blocks/filters/filter.type';
import loggerMock from '../src/mocks/mocks';
// import { UpdateProblemDto } from '../src/problem/dto/update-problem.dto';

const userSignUp: any = {
	first_name: 'John',
	last_name: 'Drinkwater',
	email: 'drinkwater@gmail.com',
	password: 'Qwerty123!',
	roles: ['user', 'admin'],
	is_email_confirmed: true,
};

describe('[Feature] Problem - /problem', () => {
	let app: INestApplication;
	let token: string;
	let problem: Problem;
	let categoryService: CategoryService;

	const problemDto = createProblemStub();

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				ProblemModule,
				CategoryModule,
				AuthModule,
				CaslModule,
				TypeOrmModule.forRoot({ ...config.dbTestConfig }),
			],
			providers: [
				{
					provide: APP_GUARD,
					useClass: AccessTokenGuard,
				},
				{
					provide: APP_GUARD,
					useClass: EmailConfirmationGuard,
				},
				{
					provide: APP_GUARD,
					useClass: PoliciesGuard,
				},
			],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
		const httpAdapter = app.get(HttpAdapterHost);
		app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter, loggerMock));

		await app.init();

		categoryService = moduleFixture.get(CategoryService);
		const authService = moduleFixture.get(AuthService);
		const signupResponse = await authService.signupLocal(userSignUp);
		token = signupResponse.tokens.accessToken;
	});

	describe('Create problem', () => {
		it('/problem (POST) - success', async () => {
			const category = await categoryService.create({ name: 'Optimization' });
			return await request(app.getHttpServer())
				.post('/problem')
				.set('Authorization', 'Bearer ' + token)
				.send({ ...problemDto, category_id: category.id } as CreateProblemDto)
				.expect(HttpStatus.CREATED)
				.then(({ body }: request.Response) => {
					problem = body;
				});
		});

		it('/problem (POST) - fail [BAD REQUEST]', () => {
			return request(app.getHttpServer())
				.post('/problem')
				.set('Authorization', 'Bearer ' + token)
				.send({
					...problemDto,
					title: 1,
				})
				.expect(HttpStatus.BAD_REQUEST);
		});
	});

	describe('Get problem/problems', () => {
		it('/problem (GET) - success', () => {
			return request(app.getHttpServer())
				.get('/problem')
				.set('Authorization', 'Bearer ' + token)
				.expect(HttpStatus.OK)
				.then(({ body }: request.Response) => {
					expect(body.length).toBe(1);
				});
		});

		it('/problem/:id (GET) - success', () => {
			return request(app.getHttpServer())
				.get(`/problem/${problem.id}`)
				.set('Authorization', 'Bearer ' + token)
				.expect(HttpStatus.OK);
		});

		it('/problem/:id (GET) - fail [NOT FOUND]', () => {
			return request(app.getHttpServer())
				.get(`/problem/${problem.category_id}`)
				.set('Authorization', 'Bearer ' + token)
				.expect(HttpStatus.NOT_FOUND)
				.then(({ body }: request.Response) => {
					expect(body).toStrictEqual<TFilterResponseBody>({
						statusCode: HttpStatus.NOT_FOUND,
						message: PROBLEM_NOT_FOUND_ERROR,
						additionalInfo: NO_ADD_INFO_ABOUT_ERROR_MSG,
						method: 'GET',
						path: `/problem/${problem.category_id}`,
						timestamp: expect.any(String),
					});
				});
		});
	});

	// describe('Update problem', () => {
	// 	it('/problem/:id (PATCH) - success', () => {
	// 		const newTitle = 'New title';
	// 		return request(app.getHttpServer())
	// 			.patch(`/problem/${problem.id}`)
	// 			.set('Authorization', 'Bearer ' + token)
	// 			.send({ title: newTitle } as UpdateProblemDto)
	// 			.expect(HttpStatus.OK)
	// 			.then(({ body }: request.Response) => {
	// 				expect(body.title).toBe(newTitle);
	// 			});
	// 	});
	// });

	describe('Give reaction to problem', () => {
		it('/toggle-reaction (POST) - success', () => {
			return request(app.getHttpServer())
				.post('/problem/toggle-reaction')
				.set('Authorization', 'Bearer ' + token)
				.send({ problem_id: problem.id, reaction_type: 'likes' } as ToggleReactionDto)
				.expect(HttpStatus.CREATED)
				.expect({ likes: 1, dislikes: 0 } as ToggleReactionResponseDto);
		});
	});

	afterAll(async () => {
		await app.close();
	});
});
