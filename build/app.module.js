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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const problem_module_1 = require("./problem/problem.module");
const compiler_module_1 = require("./compiler/compiler.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const category_module_1 = require("./category/category.module");
const comment_module_1 = require("./comment/comment.module");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const access_token_guard_1 = require("./blocks/guards/access-token.guard");
const email_module_1 = require("./email/email.module");
const email_confirmation_module_1 = require("./email-confirmation/email-confirmation.module");
const casl_module_1 = require("./casl/casl.module");
const file_module_1 = require("./file/file.module");
const policies_guard_1 = require("./blocks/guards/policies.guard");
const email_confirmation_guard_1 = require("./blocks/guards/email-confirmation.guard");
const cache_manager_1 = require("@nestjs/cache-manager");
const health_module_1 = require("./health/health.module");
const redisStore = __importStar(require("cache-manager-redis-store"));
const config_1 = __importDefault(require("./config"));
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                ...config_1.default.dbConfig,
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                store: redisStore,
                socket: config_1.default.redisCacheConfig,
                ttl: 5000,
            }),
            problem_module_1.ProblemModule,
            compiler_module_1.CompilerModule,
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            comment_module_1.CommentModule,
            auth_module_1.AuthModule,
            email_module_1.EmailModule,
            email_confirmation_module_1.EmailConfirmationModule,
            casl_module_1.CaslModule,
            file_module_1.FileModule,
            health_module_1.HealthModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: access_token_guard_1.AccessTokenGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: email_confirmation_guard_1.EmailConfirmationGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: policies_guard_1.PoliciesGuard,
            },
        ],
        controllers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map