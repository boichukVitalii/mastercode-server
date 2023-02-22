"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProblemDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_problem_dto_1 = require("./create-problem.dto");
class UpdateProblemDto extends (0, mapped_types_1.PartialType)(create_problem_dto_1.CreateProblemDto) {
}
exports.UpdateProblemDto = UpdateProblemDto;
//# sourceMappingURL=update-problem.dto.js.map