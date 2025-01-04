"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const orderdetail_middleware_1 = require("./order/orderdetail.middleware");
const prisma = new client_1.PrismaClient();
prisma.$use(orderdetail_middleware_1.orderDetailMiddleware);
prisma.$use(async (params, next) => {
    console.log(`[Prisma Middleware] Model: ${params.model}, Action: ${params.action}`);
    return next(params);
});
exports.default = prisma;
//# sourceMappingURL=middleware.js.map