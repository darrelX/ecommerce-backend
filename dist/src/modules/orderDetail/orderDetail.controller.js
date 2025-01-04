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
exports.OrderDetailController = void 0;
const common_1 = require("@nestjs/common");
const orderDetail_service_1 = require("./orderDetail.service");
const client_1 = require("@prisma/client");
let OrderDetailController = class OrderDetailController {
    constructor(orderDetailService) {
        this.orderDetailService = orderDetailService;
    }
    async getOrderDetail(skip, take, cursor, where, orderBy, page = '1') {
        const params = {
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
            cursor: cursor ? JSON.parse(cursor) : undefined,
            where: where ? JSON.parse(where) : undefined,
            orderBy: orderBy ? JSON.parse(orderBy) : undefined,
        };
        const orderDetails = await this.orderDetailService.orderDetails(params);
        const total = await this.orderDetailService.countOrderDetails(params.where);
        return {
            total: total,
            page: Number(page),
            data: orderDetails,
        };
    }
    async getOrderDetails(id) {
        return this.orderDetailService.orderDetail({ id: Number(id) });
    }
    async updateOrderDetail(id, data) {
        return this.orderDetailService.updateOrderDetail({
            where: { id: Number(id) },
            data,
        });
    }
    async createOrderDetail(orderDetailData) {
        const orderDetail = await this.orderDetailService.createOrderDetail(1, 1, 1);
        await this.orderDetailService.updateOrderTotal(1);
        return orderDetail;
    }
    async deleteOrderDetail(id) {
        return this.orderDetailService.deleteOrderDetail({ id: Number(id) });
    }
};
exports.OrderDetailController = OrderDetailController;
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
], OrderDetailController.prototype, "getOrderDetail", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "getOrderDetails", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "updateOrderDetail", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "createOrderDetail", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "deleteOrderDetail", null);
exports.OrderDetailController = OrderDetailController = __decorate([
    (0, common_1.Controller)('orderDetail'),
    __metadata("design:paramtypes", [orderDetail_service_1.OrderDetailService])
], OrderDetailController);
//# sourceMappingURL=orderDetail.controller.js.map