/// <reference types="node" />
import { QueryRunner, Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { MFile } from './mfile.class';
export declare class FileService {
    private readonly fileRepository;
    constructor(fileRepository: Repository<File>);
    saveFiles(files: MFile[], folder?: string): Promise<File[]>;
    getFileById(id: string): Promise<File | null>;
    removeFile(id: string): Promise<File | null>;
    removeFileWithQueryRunner(id: string, queryRunner: QueryRunner): Promise<File | null>;
    private saveFileDataToDB;
    convertToWebP(fileBuffer: Buffer): Promise<Buffer>;
}
