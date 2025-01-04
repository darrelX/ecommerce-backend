import { PrismaService } from '../../prisma.service';
import { Order, Prisma } from '@prisma/client';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    order(orderWhereUniqueInput: Prisma.OrderWhereUniqueInput): Promise<Order | null>;
    orders(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.OrderWhereUniqueInput;
        where?: Prisma.OrderWhereInput;
        orderBy?: Prisma.OrderOrderByWithRelationInput;
    }): Promise<Order[]>;
    createOrder(data: Prisma.OrderCreateInput): Promise<Order>;
    updateOrder(params: {
        where: Prisma.OrderWhereUniqueInput;
        data: Prisma.OrderUpdateInput;
    }): Promise<Order>;
    countOrders(where?: Prisma.OrderWhereInput): Promise<number>;
    deleteOrder(where: Prisma.OrderWhereUniqueInput): Promise<Order>;
}
