import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ProblemModule } from '../src/problem/problem.module';
import config from '../src/config';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('ProblemController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [ProblemModule, TypeOrmModule.forRoot({ ...config.dbConfig })],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('/problem (GET)', () => {
		return request(app.getHttpServer()).get('/problem').expect(200);
	});
});
