import { PrismaService } from '../../prisma.service';
import { OrderDetail, Prisma } from '@prisma/client';
export declare class OrderDetailService {
    private prisma;
    constructor(prisma: PrismaService);
    orderDetail(orderDetailWhereUniqueInput: Prisma.OrderDetailWhereUniqueInput): Promise<OrderDetail | null>;
    orderDetails(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.OrderDetailWhereUniqueInput;
        where?: Prisma.OrderDetailWhereInput;
        orderBy?: Prisma.OrderDetailOrderByWithRelationInput;
    }): Promise<OrderDetail[]>;
    createOrderDetail(orderId: number, productId: number, quantity: number): Promise<OrderDetail>;
    updateOrderTotal(orderId: number): Promise<void>;
    updateOrderDetail(params: {
        where: Prisma.OrderDetailWhereUniqueInput;
        data: Prisma.OrderDetailUpdateInput;
    }): Promise<OrderDetail>;
    countOrderDetails(where?: Prisma.OrderDetailWhereInput): Promise<number>;
    deleteOrderDetail(where: Prisma.OrderDetailWhereUniqueInput): Promise<OrderDetail>;
}
