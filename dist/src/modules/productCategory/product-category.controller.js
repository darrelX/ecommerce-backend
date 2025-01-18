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
exports.ProductCategoryController = void 0;
const common_1 = require("@nestjs/common");
const productCategory_service_1 = require("./productCategory.service");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
let ProductCategoryController = class ProductCategoryController {
    constructor(productCategoryService) {
        this.productCategoryService = productCategoryService;
    }
    async getProductCategory(skip, take, cursor, where, sortby_order, page = '1') {
        const params = {
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
            cursor: cursor ? JSON.parse(cursor) : undefined,
            where: where ? JSON.parse(where) : undefined,
            sortby_order: sortby_order ? JSON.parse(sortby_order) : undefined,
        };
        const productCategorys = await this.productCategoryService.productCategorys(params);
        const total = await this.productCategoryService.countProductCategorys(params.where);
        return {
            total: total,
            page: Number(page),
            data: productCategorys,
        };
    }
    async getProductCategorys(id) {
        try {
            return this.productCategoryService.productCategory({ id: Number(id) });
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'An error occurred while retrieving users.', error: error.message || error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateProductCategory(id, data) {
        return this.productCategoryService.updateProductCategory({
            where: { id: Number(id) },
            data,
        });
    }
    async createProductCategory(productCategoryData) {
        try {
            return await this.productCategoryService.createProductCategory(productCategoryData);
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'An error occurred while retrieving users.', error: error.message || error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteProductCategory(id) {
        try {
            return await this.productCategoryService.deleteProductCategory({ id: Number(id) });
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'An error occurred while retrieving users.', error: error.message || error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.ProductCategoryController = ProductCategoryController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get product\'s cateory' }),
    (0, swagger_1.ApiQuery)({ name: 'skip', required: false, type: String, example: '0' }),
    (0, swagger_1.ApiQuery)({ name: 'take', required: false, type: String, example: '10' }),
    (0, swagger_1.ApiQuery)({ name: 'cursor', required: false, type: String, example: '' }),
    (0, swagger_1.ApiQuery)({ name: 'where', required: false, type: String, example: '' }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, type: String, example: '' }),
    (0, swagger_1.ApiQuery)({
        name: 'sortby_order',
        required: false,
        enum: ['asc', 'desc'],
        example: 'asc'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: String, example: '1' }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'List of users returned successfully.',
        schema: {
            example: {
                "total": 1,
                "page": 1,
                "data": [
                    {
                        "id": 2,
                        "category_name": "@gmail.com",
                        "description": "description",
                        "createdAt": "2025-01-05T15:54:59.837Z",
                        "updatedAt": "2025-01-05T15:54:59.835Z"
                    }
                ]
            }
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request.',
        schema: {
            example: {
                statusCode: 400,
                message: 'Invalid input data',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error',
            },
        },
    }),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('cursor')),
    __param(3, (0, common_1.Query)('where')),
    __param(4, (0, common_1.Query)('sortby_order')),
    __param(5, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProductCategoryController.prototype, "getProductCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCategoryController.prototype, "getProductCategorys", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductCategoryController.prototype, "updateProductCategory", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiBody)({
        type: "",
        schema: {
            example: {
                categoryName: "Juices",
                description: "It's my passion"
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201, description: 'Product created successfully.',
        schema: {
            example: {
                "price": "250",
                "name": "XX",
                "description": "Plantain Mais et Poisson",
            }
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request.',
        schema: {
            example: {
                statusCode: 400,
                message: 'Invalid input data',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductCategoryController.prototype, "createProductCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCategoryController.prototype, "deleteProductCategory", null);
exports.ProductCategoryController = ProductCategoryController = __decorate([
    (0, swagger_1.ApiTags)('product-category'),
    (0, common_1.Controller)('product-category'),
    __metadata("design:paramtypes", [productCategory_service_1.ProductCategoryService])
], ProductCategoryController);
//# sourceMappingURL=product-category.controller.js.map