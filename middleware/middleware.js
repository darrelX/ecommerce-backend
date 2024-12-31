const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { orderDetailMiddleware } = require('./order-detail/order-detail-middleware');


prisma.$use(orderDetailMiddleware);
// // prisma.$use(anotherMiddleware);
prisma.$use(async (params, next) => {
    console.log(`params ${params.model} ${params.action}`);
    console.log(`next ${next}`);
    return next(params);

});

module.exports = prisma;