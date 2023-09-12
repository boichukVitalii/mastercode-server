import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundCustomError } from '../errors/custom-errors';
import { File } from '../file/entities/file.entity';
import { FileService } from '../file/file.service';
import { MFile } from '../file/mfile.class';
import { DataSource, DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { USER_NOT_FOUND_ERROR } from './user.constants';
import { ProblemService } from '../problem/problem.service';
import { ProblemDifficulty } from '../problem/entities/problem.entity';
import { UserSolvedProblem } from './entities/user-solved-problem.entity';
import { AddSolvedProblemDto } from './dto/add-solved-problem.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { UserStatisticsDto } from './dto/user-statistics.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(UserSolvedProblem)
		private readonly userSolvedProblemRepository: Repository<UserSolvedProblem>,
		private readonly problemService: ProblemService,
		private readonly fileService: FileService,
		private readonly dataSource: DataSource,
	) {}

	async create(data: DeepPartial<User>): Promise<User> {
		const user = this.userRepository.create(data);
		return await this.userRepository.save(user);
	}

	async findMany(options: UserQueryDto): Promise<User[]> {
		const { skip, take, email } = options;
		return await this.userRepository.find({ skip, take, where: { email } });
	}

	async findOne(where: FindOptionsWhere<User>): Promise<User | null> {
		return await this.userRepository.findOneBy(where);
	}

	async findOneOrThrow(where: FindOptionsWhere<User>): Promise<User> {
		const user = await this.userRepository.findOneBy(where);
		if (!user) throw new EntityNotFoundCustomError(USER_NOT_FOUND_ERROR);
		return user;
	}

	async updateOne(where: FindOptionsWhere<User>, data: DeepPartial<User>): Promise<User> {
		const user = await this.findOneOrThrow(where);
		return await this.userRepository.save({ ...user, ...data });
	}

	async updateMany(options: FindManyOptions<User>, data: DeepPartial<User>): Promise<User[]> {
		const users = await this.findMany(options);
		if (!users.length) return [];
		return await this.userRepository.save(users.map((user: User) => ({ ...user, ...data })));
	}

	async remove(where: FindOptionsWhere<User>): Promise<User | null> {
		const user = await this.findOneOrThrow(where);
		return await this.userRepository.remove(user);
	}

	async uploadAvatar(file: Express.Multer.File, userId: string): Promise<File> {
		const user = await this.findOneOrThrow({ id: userId });
		if (user.avatar_id) await this.removeAvatar(userId);

		const bufferWebP = await this.fileService.convertToWebP(file.buffer);
		const filename = `avatar-${userId}.webp`;
		const mimetype = 'image/webp';
		const mfile = new MFile(filename, mimetype, bufferWebP);
		const folderToSave = 'avatars';
		const avatar = (await this.fileService.saveFiles([mfile], folderToSave))[0];

		user.avatar_id = avatar.id;
		await this.userRepository.save({ ...user });
		return avatar;
	}

	async getUserAvatar(userId: string): Promise<File | null> {
		const user = await this.findOneOrThrow({ id: userId });
		if (!user.avatar_id) return null;
		return await this.fileService.getFileById(user.avatar_id);
	}

	async removeAvatar(userId: string): Promise<void> {
		const queryRunner = this.dataSource.createQueryRunner();
		const user = await this.findOneOrThrow({ id: userId });
		if (!user.avatar_id) return;

		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			await queryRunner.manager.update(User, { id: userId }, { ...user, avatar_id: null });
			await this.fileService.removeFileWithQueryRunner(user.avatar_id, queryRunner);
			await queryRunner.commitTransaction();
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		} finally {
			await queryRunner.release();
		}
	}

	async addSolvedProblem(data: AddSolvedProblemDto): Promise<void> {
		await Promise.all([
			this.findOneOrThrow({ id: data.user_id }),
			this.problemService.findOneOrThrow({ id: data.problem_id }),
		]);

		const solvedProblem = this.userSolvedProblemRepository.create({ ...data });
		await this.userSolvedProblemRepository.save(solvedProblem);
	}

	async getSolvedProblems(userId: string): Promise<UserSolvedProblem[]> {
		return await this.userSolvedProblemRepository.find({
			where: { user_id: userId },
			relations: {
				problem: true,
			},
		});
	}

	async getUserStatistics(userId: string): Promise<UserStatisticsDto> {
		const solvedProblems = await this.getSolvedProblems(userId);
		const numberOfSolvedProblems = solvedProblems.length;

		const [numberOfEasyProblems, numberOfMediumProblems, numberOfHardProblems] = await Promise.all(
			Object.values(ProblemDifficulty).map(
				async (difficulty) =>
					await this.problemService.getNumberOfProblemsBy({
						difficulty,
					}),
			),
		);

		const [numberOfSolvedEasyProblems, numberOfSolvedMediumProblems, numberOfSolvedHardProblems] =
			await Promise.all(
				Object.values(ProblemDifficulty).map(
					async (difficulty) =>
						await this.userSolvedProblemRepository.countBy({
							problem: { difficulty },
							user_id: userId,
						}),
				),
			);

		return {
			numberOfSolvedProblems,
			numberOfEasyProblems,
			numberOfMediumProblems,
			numberOfHardProblems,
			numberOfSolvedEasyProblems,
			numberOfSolvedMediumProblems,
			numberOfSolvedHardProblems,
		};
	}
}
