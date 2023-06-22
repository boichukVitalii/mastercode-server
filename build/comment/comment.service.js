"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const custom_errors_1 = require("../errors/custom-errors");
const comment_constants_1 = require("./comment.constants");
let CommentService = class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async create(data, user, problem) {
        const comment = this.commentRepository.create({
            ...data,
            user,
            problem: {
                id: problem.id,
            },
        });
        return this.commentRepository.save(comment);
    }
    async findMany(options) {
        const { skip, take, problem_id } = options;
        return this.commentRepository.find({
            skip,
            take,
            where: {
                problem: {
                    id: problem_id,
                },
            },
        });
    }
    async findOne(where) {
        return this.commentRepository.findOneBy(where);
    }
    async findOneOrThrow(where) {
        const comment = await this.commentRepository.findOneBy(where);
        if (!comment)
            throw new custom_errors_1.EntityNotFoundCustomError(comment_constants_1.COMMENT_NOT_FOUND_ERROR);
        return comment;
    }
    async updateOne(where, data) {
        const comment = await this.findOneOrThrow(where);
        return this.commentRepository.save({ ...comment, ...data });
    }
    async remove(where) {
        const comment = await this.findOneOrThrow(where);
        return this.commentRepository.remove(comment);
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map