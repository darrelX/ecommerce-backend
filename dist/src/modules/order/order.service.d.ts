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
    createOrderWithProducts(user_id: number, products: Array<{
        product_id: number;
        quantity: number;
        price: number;
    }>): Promise<{
        id: number;
        amount: Prisma.Decimal;
        status: import(".prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        user_id: number;
    }>;
    createOrder(data: Prisma.OrderCreateInput, orderDetail: Prisma.OrderDetailCreateInput[]): Promise<Order>;
    updateOrder(params: {
        where: Prisma.OrderWhereUniqueInput;
        data: Prisma.OrderUpdateInput;
    }): Promise<Order>;
    countOrders(where?: Prisma.OrderWhereInput): Promise<number>;
    deleteOrder(where: Prisma.OrderWhereUniqueInput): Promise<Order>;
}
