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
exports.Category = void 0;
const openapi = require("@nestjs/swagger");
const problem_entity_1 = require("../../problem/entities/problem.entity");
const typeorm_1 = require("typeorm");
let Category = class Category {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, additional_info: { required: false, type: () => String, nullable: true }, problems: { required: true, type: () => [require("../../problem/entities/problem.entity").Problem] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 254, unique: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "additional_info", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => problem_entity_1.Problem, (problem) => problem.category),
    __metadata("design:type", Array)
], Category.prototype, "problems", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)('category')
], Category);
exports.Category = Category;
//# sourceMappingURL=category.entity.js.map