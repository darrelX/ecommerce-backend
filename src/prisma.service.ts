
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { orderDetailMiddleware } from './middleware/order/orderdetail.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    // Ajouter le middleware `orderDetailMiddleware`
    this.$use(orderDetailMiddleware);

    // Ajouter un middleware de journalisation
    this.$use(async (params, next) => {
      console.log(`[Prisma Middleware] Model: ${params.model}, Action: ${params.action}`);
      return next(params);
    });
  }
  
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
