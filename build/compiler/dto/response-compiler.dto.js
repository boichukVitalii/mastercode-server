"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCompilerDto = exports.Verdict = void 0;
const openapi = require("@nestjs/swagger");
exports.Verdict = {
    Accepted: 'Accepted',
    Correct: 'Correct',
    WrongAnswer: 'Wrong answer',
    Error: 'Error',
};
class ResponseCompilerDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { verdict: { required: true, type: () => Object }, logs: { required: false, type: () => String }, runTime: { required: false, type: () => String } };
    }
}
exports.ResponseCompilerDto = ResponseCompilerDto;
//# sourceMappingURL=response-compiler.dto.js.map