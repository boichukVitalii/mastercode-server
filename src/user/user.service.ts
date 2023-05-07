import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundCustomError } from 'src/errors/custom-errors';
import { File } from 'src/file/entities/file.entity';
import { FileService } from 'src/file/file.service';
import { MFile } from 'src/file/mfile.class';
import { DataSource, DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { USER_NOT_FOUND_ERROR } from './user.constants';
import { ProblemService } from 'src/problem/problem.service';
import { PROBLEM_NOT_FOUND_ERROR } from 'src/problem/problem.constants';
import { Problem } from 'src/problem/entities/problem.entity';
import { UserSolvedProblem } from './entities/user-solved-problem.entity';
import { AddSolvedProblemDto } from './dto/add-solved-problem.dto';
import { UserQueryDto } from './dto/user-query.dto';

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
		return this.userRepository.save(user);
	}

	async findMany(options: UserQueryDto): Promise<User[]> {
		const { skip, take, email } = options;
		return this.userRepository.find({ skip, take, where: { email } });
	}

	async findOne(where: FindOptionsWhere<User>): Promise<User | null> {
		return this.userRepository.findOneBy(where);
	}

	async findOneOrThrow(where: FindOptionsWhere<User>): Promise<User> {
		const user = await this.userRepository.findOneBy(where);
		if (!user) throw new EntityNotFoundCustomError(USER_NOT_FOUND_ERROR);
		return user;
	}

	async updateOne(where: FindOptionsWhere<User>, data: DeepPartial<User>): Promise<User> {
		const user = await this.findOneOrThrow(where);
		return this.userRepository.save({ ...user, ...data });
	}

	async updateMany(options: FindManyOptions<User>, data: DeepPartial<User>): Promise<User[]> {
		const users = await this.findMany(options);
		if (!users.length) return [];
		return this.userRepository.save(users.map((user: User) => ({ ...user, ...data })));
	}

	async remove(where: FindOptionsWhere<User>): Promise<User | null> {
		const user = await this.findOneOrThrow(where);
		return this.userRepository.remove(user);
	}

	async uploadAvatar(file: Express.Multer.File, userId: string): Promise<File> {
		const bufferWebP = await this.fileService.convertToWebP(file.buffer);
		const filename = `avatar-${userId}.webp`;
		const mimetype = 'image/webp';
		const mfile = new MFile(filename, mimetype, bufferWebP);
		const folderToSave = 'avatars';
		const avatar = (await this.fileService.saveFiles([mfile], folderToSave))[0];
		const user = await this.findOneOrThrow({ id: userId });

		if (user.avatar_id) await this.removeAvatar(userId);

		user.avatar_id = avatar.id;
		await this.userRepository.save({ ...user });
		return avatar;
	}

	async getUserAvatar(userId: string): Promise<File | null> {
		const user = await this.findOneOrThrow({ id: userId });
		if (!user.avatar_id) return null;
		return this.fileService.getFileById(user.avatar_id);
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
		// const user = await this.findOne({ id: data.user_id });
		// if (!user) throw new EntityNotFoundCustomError(USER_NOT_FOUND_ERROR);
		// const problem = await this.problemService.findOne({ id: data.problem_id });
		// if (!problem) throw new EntityNotFoundCustomError(PROBLEM_NOT_FOUND_ERROR);

		const solvedProblem = this.userSolvedProblemRepository.create({ ...data });
		await this.userSolvedProblemRepository.save(solvedProblem);
	}

	async getSolvedProblems(userId: string): Promise<UserSolvedProblem[]> {
		return this.userSolvedProblemRepository.find({
			where: { user_id: userId },
			relations: {
				problem: true,
			},
		});
	}
}
