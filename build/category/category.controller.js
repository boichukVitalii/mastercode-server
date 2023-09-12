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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const check_policies_decorator_1 = require("../blocks/decorators/check-policies.decorator");
const policy_handler_1 = require("../blocks/handlers/policy.handler");
const casl_types_type_1 = require("../casl/types/casl-types.type");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const category_constants_1 = require("./category.constants");
const category_service_1 = require("./category.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const category_entity_1 = require("./entities/category.entity");
const swagger_1 = require("@nestjs/swagger");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async create(dto) {
        return await this.categoryService.create(dto);
    }
    async findMany(query) {
        const categories = await this.categoryService.findMany(query);
        if (!categories.length)
            throw new common_1.NotFoundException(category_constants_1.CATEGORIES_NOT_FOUND_ERROR);
        return categories;
    }
    async findOne(id) {
        return await this.categoryService.findOneOrThrow({ id });
    }
    async update(id, dto) {
        return await this.categoryService.updateOne({ id }, dto);
    }
    async remove(id) {
        return await this.categoryService.remove({ id });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.Create, category_entity_1.Category)),
    openapi.ApiResponse({ status: 201, type: require("./entities/category.entity").Category }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.ReadMany, category_entity_1.Category)),
    openapi.ApiResponse({ status: 200, type: [require("./entities/category.entity").Category] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.ReadOne, category_entity_1.Category)),
    openapi.ApiResponse({ status: 200, type: require("./entities/category.entity").Category }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.Update, category_entity_1.Category)),
    openapi.ApiResponse({ status: 200, type: require("./entities/category.entity").Category }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.Delete, category_entity_1.Category)),
    openapi.ApiResponse({ status: 200, type: require("./entities/category.entity").Category }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "remove", null);
CategoryController = __decorate([
    (0, swagger_1.ApiTags)('category'),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map