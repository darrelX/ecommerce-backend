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
exports.ProductCategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let ProductCategoryService = class ProductCategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async productCategory(productCategoryWhereUniqueInput) {
        return this.prisma.productCategory.findUnique({
            where: productCategoryWhereUniqueInput,
        });
    }
    async productCategorys(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.productCategory.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createProductCategory(data) {
        return this.prisma.productCategory.create({
            data,
        });
    }
    async updateProductCategory(params) {
        const { where, data } = params;
        return this.prisma.productCategory.update({
            data,
            where,
        });
    }
    async countProductCategorys(where) {
        return this.prisma.productCategory.count({
            where,
        });
    }
    async deleteProductCategory(where) {
        return this.prisma.productCategory.delete({
            where,
        });
    }
};
exports.ProductCategoryService = ProductCategoryService;
exports.ProductCategoryService = ProductCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductCategoryService);
//# sourceMappingURL=productCategory.service.js.map