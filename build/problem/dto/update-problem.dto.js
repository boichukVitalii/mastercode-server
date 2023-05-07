"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProblemDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_problem_dto_1 = require("./create-problem.dto");
class UpdateProblemDto extends (0, swagger_1.PartialType)(create_problem_dto_1.CreateProblemDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateProblemDto = UpdateProblemDto;
//# sourceMappingURL=update-problem.dto.js.map