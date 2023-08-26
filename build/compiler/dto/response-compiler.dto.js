"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCompilerDto = exports.Verdict = void 0;
const openapi = require("@nestjs/swagger");
exports.Verdict = {
    Correct: 'Correct',
    WrongAnswer: 'Wrong answer',
    Timeout: 'Timeout',
    Error: 'Error',
};
class ResponseCompilerDto {
    constructor(verdict, info, logs, runTime) {
        this.verdict = verdict;
        this.info = info;
        this.logs = logs;
        this.runTime = runTime;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ResponseCompilerDto = ResponseCompilerDto;
//# sourceMappingURL=response-compiler.dto.js.map