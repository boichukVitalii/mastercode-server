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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const compiler_service_1 = require("./compiler.service");
const compiler_dto_1 = require("./dto/compiler.dto");
const swagger_1 = require("@nestjs/swagger");
const logger_1 = __importDefault(require("../logger"));
const get_current_userId_decorator_1 = require("../blocks/decorators/get-current-userId.decorator");
let CompilerController = class CompilerController {
    constructor(compilerService) {
        this.compilerService = compilerService;
    }
    async compile(dto, userId) {
        try {
            return this.compilerService.compile(dto, userId);
        }
        catch (e) {
            logger_1.default.error(e);
            throw new common_1.InternalServerErrorException();
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./dto/response-compiler.dto").ResponseCompilerDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_current_userId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [compiler_dto_1.CompilerDto, String]),
    __metadata("design:returntype", Promise)
], CompilerController.prototype, "compile", null);
CompilerController = __decorate([
    (0, swagger_1.ApiTags)('compiler'),
    (0, common_1.Controller)('compiler'),
    __metadata("design:paramtypes", [compiler_service_1.CompilerService])
], CompilerController);
exports.CompilerController = CompilerController;
//# sourceMappingURL=compiler.controller.js.map