"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const file_entity_1 = require("./entities/file.entity");
const config_1 = __importDefault(require("../config"));
const fs = __importStar(require("node:fs"));
const node_path_1 = require("node:path");
const sharp_1 = __importDefault(require("sharp"));
let FileService = class FileService {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    async saveFiles(files, folder = '') {
        fs.mkdirSync(config_1.default.uploadsPath, { recursive: true });
        const folderPath = (0, node_path_1.join)(config_1.default.uploadsPath, folder);
        if (folder)
            fs.mkdirSync(folderPath, { recursive: true });
        const filesData = [];
        for (const file of files) {
            const filePath = (0, node_path_1.join)(folderPath, file.filename);
            await fs.promises.writeFile(filePath, file.buffer);
            const fileData = await this.saveFileDataToDB({ ...file, path: filePath });
            filesData.push(fileData);
        }
        return filesData;
    }
    async getFileById(id) {
        return await this.fileRepository.findOneBy({ id });
    }
    async removeFile(id) {
        const file = await this.getFileById(id);
        if (!file)
            return null;
        const deletedFile = await this.fileRepository.remove(file);
        await fs.promises.rm(file.path);
        return deletedFile;
    }
    async removeFileWithQueryRunner(id, queryRunner) {
        const file = await queryRunner.manager.findOneBy(file_entity_1.File, { id });
        if (!file)
            return null;
        const deletedFile = await queryRunner.manager.remove(file_entity_1.File, file);
        await fs.promises.rm(file.path, { force: true });
        return deletedFile;
    }
    async convertToWebP(fileBuffer) {
        return await (0, sharp_1.default)(fileBuffer).webp().toBuffer();
    }
    async saveFileDataToDB(fileInfo) {
        const newFile = this.fileRepository.create(fileInfo);
        return await this.fileRepository.save(newFile);
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map