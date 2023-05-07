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
exports.File = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let File = class File {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, filename: { required: true, type: () => String }, path: { required: true, type: () => String }, mimetype: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], File.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 254 }),
    __metadata("design:type", String)
], File.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 254 }),
    __metadata("design:type", String)
], File.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 12 }),
    __metadata("design:type", String)
], File.prototype, "mimetype", void 0);
File = __decorate([
    (0, typeorm_1.Entity)('file')
], File);
exports.File = File;
//# sourceMappingURL=file.entity.js.map