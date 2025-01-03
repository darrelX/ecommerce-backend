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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarrelBroController = void 0;
const common_1 = require("@nestjs/common");
const darrelBro_service_1 = require("./darrelBro.service");
const client_1 = require("@prisma/client");
let DarrelBroController = class DarrelBroController {
    constructor(darrelBroService) {
        this.darrelBroService = darrelBroService;
    }
    async getDarrelBro(skip, take, cursor, where, orderBy, page = '1') {
        const params = {
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
            cursor: cursor ? JSON.parse(cursor) : undefined,
            where: where ? JSON.parse(where) : undefined,
            orderBy: orderBy ? JSON.parse(orderBy) : undefined,
        };
        const darrelBros = await this.darrelBroService.darrelBros(params);
        const total = await this.darrelBroService.countDarrelBros(params.where);
        return {
            total: total,
            page: Number(page),
            data: darrelBros,
        };
    }
    async getDarrelBro(id) {
        return this.darrelBroService.darrelBro({ id: Number(id) });
    }
    async updateDarrelBro(id, data) {
        return this.darrelBroService.updateDarrelBro({
            where: { id: Number(id) },
            data,
        });
    }
    async createDarrelBro(darrelBroData) {
        return this.darrelBroService.createDarrelBro(darrelBroData);
    }
    async deleteDarrelBro(id) {
        return this.darrelBroService.deleteDarrelBro({ id: Number(id) });
    }
};
exports.DarrelBroController = DarrelBroController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('cursor')),
    __param(3, (0, common_1.Query)('where')),
    __param(4, (0, common_1.Query)('orderBy')),
    __param(5, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], DarrelBroController.prototype, "getDarrelBro", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DarrelBroController.prototype, "getDarrelBro", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof client_1.Prisma !== "undefined" && client_1.Prisma.DarrelBroUpdateInput) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], DarrelBroController.prototype, "updateDarrelBro", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof client_1.Prisma !== "undefined" && client_1.Prisma.DarrelBroCreateInput) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], DarrelBroController.prototype, "createDarrelBro", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DarrelBroController.prototype, "deleteDarrelBro", null);
exports.DarrelBroController = DarrelBroController = __decorate([
    (0, common_1.Controller)('darrelBro'),
    __metadata("design:paramtypes", [darrelBro_service_1.DarrelBroService])
], DarrelBroController);
//# sourceMappingURL=darrelBro.controller.js.map