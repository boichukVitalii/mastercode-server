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
exports.ProblemModule = void 0;
const common_1 = require("@nestjs/common");
const problem_service_1 = require("./problem.service");
const problem_controller_1 = require("./problem.controller");
const typeorm_1 = require("@nestjs/typeorm");
const problem_entity_1 = require("./entities/problem.entity");
const problem_reaction_entity_1 = require("./entities/problem-reaction.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
const redisStore = __importStar(require("cache-manager-redis-store"));
const config_1 = __importDefault(require("../config"));
let ProblemModule = class ProblemModule {
};
ProblemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([problem_entity_1.Problem, problem_reaction_entity_1.ProblemReaction]),
            cache_manager_1.CacheModule.register({
                useFactory: async () => ({
                    store: redisStore,
                    socket: config_1.default.redisCacheConfig,
                }),
            }),
        ],
        controllers: [problem_controller_1.ProblemController],
        providers: [problem_service_1.ProblemService],
        exports: [problem_service_1.ProblemService],
    })
], ProblemModule);
exports.ProblemModule = ProblemModule;
//# sourceMappingURL=problem.module.js.map