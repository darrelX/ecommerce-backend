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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getproducts(skip, take, cursor, where, sortbyOrder, page = '1') {
        const params = {
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
            cursor: cursor ? JSON.parse(cursor) : undefined,
            where: where ? JSON.parse(where) : undefined,
            orderBy: sortbyOrder ? JSON.parse(sortbyOrder) : undefined,
        };
        const products = await this.productService.products(params);
        const total = await this.productService.countProducts(params.where);
        return {
            total: total,
            page: Number(page),
            data: products,
        };
    }
    async getproduct(id) {
        return this.productService.product({ id: Number(id) });
    }
    async updateproduct(id, data) {
        return this.productService.updateProduct({
            where: { id: Number(id) },
            data,
        });
    }
    async createproduct(productData) {
        return this.productService.createProduct(productData);
    }
    async deleteproduct(id) {
        return this.productService.deleteProduct({ id: Number(id) });
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get products' }),
    (0, swagger_1.ApiQuery)({ name: 'skip', required: false, type: String, example: '0' }),
    (0, swagger_1.ApiQuery)({ name: 'take', required: false, type: String, example: '10' }),
    (0, swagger_1.ApiQuery)({ name: 'cursor', required: false, type: String, example: '' }),
    (0, swagger_1.ApiQuery)({ name: 'where', required: false, type: String, example: '' }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, type: String, example: 'name' }),
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
                        "price": "250",
                        "name": "XX",
                        "description": "Plantain Mais et Poisson",
                        "image": "https://www.google.com",
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
], ProductController.prototype, "getproducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getproduct", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateproduct", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Create product' }),
    (0, swagger_1.ApiBody)({
        type: 'Prisma.ProductCreateInput',
        schema: {
            example: { price: "250", name: "XX", description: "Plantain Mais et Poisson", image: "https://www.google.com", category: "1" },
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201, description: 'Product created successfully.',
        schema: {
            example: {
                "price": "250",
                "name": "XX",
                "description": "Plantain Mais et Poisson",
                "image": "https://www.google.com",
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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createproduct", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteproduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map