import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { FileDto } from './dto/file.dto';
import { File } from './entities/file.entity';
import { MFile } from './mfile.class';
import config from 'src/config';

import * as fs from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

@Injectable()
export class FileService {
	constructor(@InjectRepository(File) private readonly fileRepository: Repository<File>) {}

	async saveFiles(files: MFile[], folder = ''): Promise<File[]> {
		fs.mkdirSync(config.uploadsPath, { recursive: true });
		const folderPath = join(config.uploadsPath, folder);
		if (folder) fs.mkdirSync(folderPath, { recursive: true });
		const filesData = [];
		for (const file of files) {
			const filePath = join(folderPath, file.filename);
			await fs.promises.writeFile(filePath, file.buffer);
			const fileData = await this.saveFileDataToDB({ ...file, path: filePath });
			filesData.push(fileData);
		}
		return filesData;
	}

	async getFileById(id: string): Promise<File | null> {
		return await this.fileRepository.findOneBy({ id });
	}

	async removeFile(id: string): Promise<File | null> {
		const file = await this.getFileById(id);
		if (!file) return null;
		const deletedFile = await this.fileRepository.remove(file);
		await fs.promises.rm(file.path);
		return deletedFile;
	}

	async removeFileWithQueryRunner(id: string, queryRunner: QueryRunner): Promise<File | null> {
		const file = await queryRunner.manager.findOneBy(File, { id });
		if (!file) return null;
		const deletedFile = await queryRunner.manager.remove<File>(File, file);
		await fs.promises.rm(file.path);
		return deletedFile;
	}

	async convertToWebP(fileBuffer: Buffer): Promise<Buffer> {
		return await sharp(fileBuffer).webp().toBuffer();
	}

	private async saveFileDataToDB(fileInfo: FileDto): Promise<File> {
		const newFile = this.fileRepository.create(fileInfo);
		return await this.fileRepository.save(newFile);
	}
}
