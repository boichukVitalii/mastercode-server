"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerModule = void 0;
const common_1 = require("@nestjs/common");
const compiler_service_1 = require("./compiler.service");
const compiler_controller_1 = require("./compiler.controller");
const problem_module_1 = require("../problem/problem.module");
let CompilerModule = class CompilerModule {
};
CompilerModule = __decorate([
    (0, common_1.Module)({
        imports: [problem_module_1.ProblemModule],
        controllers: [compiler_controller_1.CompilerController],
        providers: [compiler_service_1.CompilerService],
    })
], CompilerModule);
exports.CompilerModule = CompilerModule;
//# sourceMappingURL=compiler.module.js.map