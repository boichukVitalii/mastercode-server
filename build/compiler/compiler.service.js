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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerService = void 0;
const common_1 = require("@nestjs/common");
const response_compiler_dto_1 = require("./dto/response-compiler.dto");
const problem_service_1 = require("../problem/problem.service");
const compiler_class_1 = require("./compiler.class");
const user_service_1 = require("../user/user.service");
let CompilerService = class CompilerService {
    constructor(problemService, userService) {
        this.problemService = problemService;
        this.userService = userService;
    }
    async compile({ code, lang, problemId, submit }, userId) {
        const problem = await this.problemService.findOneOrThrow({ id: problemId });
        const compiler = new compiler_class_1.Compiler(code, lang, problem);
        const result = await compiler.compile();
        if (submit && result.verdict === response_compiler_dto_1.Verdict.Accepted) {
            await this.userService.addSolvedProblem({
                problem_id: problemId,
                user_id: userId,
                run_time: parseFloat(result.runTime),
                language: lang,
            });
        }
        if (!submit && result.verdict === response_compiler_dto_1.Verdict.Accepted) {
            result.verdict = response_compiler_dto_1.Verdict.Correct;
        }
        return result;
    }
};
CompilerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [problem_service_1.ProblemService,
        user_service_1.UserService])
], CompilerService);
exports.CompilerService = CompilerService;
//# sourceMappingURL=compiler.service.js.map