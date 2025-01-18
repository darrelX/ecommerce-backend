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
exports.OrderDetailService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let OrderDetailService = class OrderDetailService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async orderDetail(orderDetailWhereUniqueInput) {
        return this.prisma.orderDetail.findUnique({
            where: orderDetailWhereUniqueInput,
        });
    }
    async orderDetails(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.orderDetail.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createOrderDetail(order_id, product_id, quantity) {
        const product = await this.prisma.product.findUnique({
            where: { id: product_id },
        });
        if (!product) {
            throw new Error('Produit introuvable');
        }
        const orderDetail = await this.prisma.orderDetail.create({
            data: {
                order_id,
                product_id,
                quantity,
                price: product.price,
            },
        });
        return orderDetail;
    }
    async updateOrderTotal(order_id) {
        const orderDetails = await this.prisma.orderDetail.findMany({
            where: { order_id },
        });
        const totalAmount = orderDetails.reduce((sum, detail) => {
            return sum + Number(detail.price) * detail.quantity;
        }, 0);
        await this.prisma.order.update({
            where: { id: order_id },
            data: { amount: totalAmount },
        });
    }
    async updateOrderDetail(params) {
        const { where, data } = params;
        return this.prisma.orderDetail.update({
            data,
            where,
        });
    }
    async countOrderDetails(where) {
        return this.prisma.orderDetail.count({
            where,
        });
    }
    async deleteOrderDetail(where) {
        return this.prisma.orderDetail.delete({
            where,
        });
    }
};
exports.OrderDetailService = OrderDetailService;
exports.OrderDetailService = OrderDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderDetailService);
//# sourceMappingURL=orderDetail.service.js.map