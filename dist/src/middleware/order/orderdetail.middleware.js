"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDetailMiddleware = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const orderDetailMiddleware = async (params, next) => {
    if (params.model === 'OrderDetail' && params.action === 'create') {
        const data = params.args.data;
        if (!data.product_id) {
            throw new Error('Le champ productId est requis pour créer un OrderDetail.');
        }
        const product = await prisma.product.findUnique({
            where: { id: data.product_id },
        });
        if (!product) {
            throw new Error('Produit introuvable.');
        }
        data.price = product.price;
        data.quantity = data.quantity || 1;
    }
    return next(params);
};
exports.orderDetailMiddleware = orderDetailMiddleware;
//# sourceMappingURL=orderdetail.middleware.js.map