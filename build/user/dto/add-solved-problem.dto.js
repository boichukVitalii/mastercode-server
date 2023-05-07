"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSolvedProblemDto = void 0;
const openapi = require("@nestjs/swagger");
class AddSolvedProblemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { problem_id: { required: true, type: () => String }, user_id: { required: true, type: () => String }, run_time: { required: true, type: () => Number }, language: { required: true, type: () => Object } };
    }
}
exports.AddSolvedProblemDto = AddSolvedProblemDto;
//# sourceMappingURL=add-solved-problem.dto.js.map