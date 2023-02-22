"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompilerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_compiler_dto_1 = require("./create-compiler.dto");
class UpdateCompilerDto extends (0, mapped_types_1.PartialType)(create_compiler_dto_1.CreateCompilerDto) {
}
exports.UpdateCompilerDto = UpdateCompilerDto;
//# sourceMappingURL=update-compiler.dto.js.map