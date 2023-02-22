"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const problem_module_1 = require("./problem/problem.module");
const compiler_module_1 = require("./compiler/compiler.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = __importDefault(require("./config"));
const user_module_1 = require("./user/user.module");
const category_module_1 = require("./category/category.module");
const comment_module_1 = require("./comment/comment.module");
const logger_1 = require("./logger");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                ...config_1.default.dbConfig,
                logger: logger_1.queryLogger,
            }),
            problem_module_1.ProblemModule,
            compiler_module_1.CompilerModule,
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            comment_module_1.CommentModule,
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map