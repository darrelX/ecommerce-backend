import { PrismaClient, Prisma } from '@prisma/client';
import { orderDetailMiddleware } from './order/orderdetail.middleware';

// Créer une instance Prisma
const prisma = new PrismaClient();

// Ajouter le middleware `orderDetailMiddleware`
prisma.$use(orderDetailMiddleware);

// Ajouter un middleware de journalisation
prisma.$use(async (params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<any>) => {
  console.log(`[Prisma Middleware] Model: ${params.model}, Action: ${params.action}`);
  return next(params);
});

// Exporter l'instance Prisma pour une utilisation dans l'application
export default prisma;
