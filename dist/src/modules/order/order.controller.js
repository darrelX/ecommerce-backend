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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const create_order_dto_1 = require("./dto/create-order.dto");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getOrder(skip, take, cursor, where, sortby_order, page = '1') {
        const params = {
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
            cursor: cursor ? JSON.parse(cursor) : undefined,
            where: where ? JSON.parse(where) : undefined,
            sortby_order: sortby_order ? JSON.parse(sortby_order) : undefined,
        };
        const orders = await this.orderService.orders(params);
        const total = await this.orderService.countOrders(params.where);
        return {
            total: total,
            page: Number(page),
            data: orders,
        };
    }
    async getOrders(id) {
        return this.orderService.order({ id: Number(id) });
    }
    async updateOrder(id, data) {
        return this.orderService.updateOrder({
            where: { id: Number(id) },
            data,
        });
    }
    async createOrder(createOrderDto) {
        try {
            const { user_id, orderDetails } = createOrderDto;
            const createdOrder = await this.orderService.createOrderWithProducts(user_id, orderDetails);
            return createdOrder;
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'An error occurred while creating the order.',
                error: error.message || error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteOrder(id) {
        return this.orderService.deleteOrder({ id: Number(id) });
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Get order\'s cateory' }),
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
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            example: {
                user_id: 123,
                order_id: 456,
                orderDetails: [
                    { product_id: 1, quantity: 2, price: 15.50 },
                    { product_id: 2, quantity: 1, price: 45.00 },
                    { product_id: 3, quantity: 3, price: 10.00 },
                ],
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Order created successfully.',
        schema: {
            example: {
                id: 1,
                user_id: 123,
                amount: 100.50,
                status: 'Pending',
                orderDetails: [
                    { product_id: 1, quantity: 2, price: 15.50 },
                    { product_id: 2, quantity: 1, price: 45.00 },
                    { product_id: 3, quantity: 3, price: 10.00 },
                ],
            },
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
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map