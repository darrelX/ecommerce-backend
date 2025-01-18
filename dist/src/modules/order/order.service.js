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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async order(orderWhereUniqueInput) {
        return this.prisma.order.findUnique({
            where: orderWhereUniqueInput,
        });
    }
    async orders(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.order.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createOrderWithProducts(user_id, products) {
        return this.prisma.$transaction(async (prisma) => {
            const product_ids = products.map((p) => p.product_id);
            const existingProducts = await prisma.product.findMany({
                where: { id: { in: product_ids } },
                select: { id: true },
            });
            const existingProductIds = existingProducts.map((p) => p.id);
            const invalidProductIds = product_ids.filter((id) => !existingProductIds.includes(id));
            if (invalidProductIds.length > 0) {
                throw new Error(`Invalid product IDs: ${invalidProductIds.join(', ')}`);
            }
            const totalAmount = products.reduce((sum, p) => sum + p.quantity * p.price, 0);
            const order = await prisma.order.create({
                data: {
                    user_id,
                    status: 'Pending',
                    amount: totalAmount,
                },
            });
            const orderDetails = products.map((p) => ({
                order_id: order.id,
                product_id: p.product_id,
                quantity: p.quantity,
                price: p.price,
            }));
            await prisma.orderDetail.createMany({
                data: orderDetails,
            });
            return order;
        });
    }
    async createOrder(data, orderDetail) {
        return this.prisma.order.create({
            data: {
                ...data,
                orderDetails: {
                    create: orderDetail
                }
            },
            include: {
                orderDetails: true
            }
        });
    }
    async updateOrder(params) {
        const { where, data } = params;
        return this.prisma.order.update({
            data,
            where,
        });
    }
    async countOrders(where) {
        return this.prisma.order.count({
            where,
        });
    }
    async deleteOrder(where) {
        return this.prisma.order.delete({
            where,
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map