import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../user.controller';
import { UserService } from '../../user.service';

describe('UserController', () => {
	let controller: UserController;

	const mockUserService = {
		create: jest.fn((dto) => ({
			...dto,
		})),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [UserService],
		})
			.overrideProvider(UserService)
			.useValue(mockUserService)
			.compile();

		controller = module.get<UserController>(UserController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should create a user', () => {
		expect(controller.findOne('1')).toEqual({
			id: expect.any(String),
			name: 'Vitalii',
		});
		expect(mockUserService).toHaveBeenCalled();
	});
});
