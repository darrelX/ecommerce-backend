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
    createOrderDetail(order_id: number, product_id: number, quantity: number): Promise<OrderDetail>;
    updateOrderTotal(order_id: number): Promise<void>;
    updateOrderDetail(params: {
        where: Prisma.OrderDetailWhereUniqueInput;
        data: Prisma.OrderDetailUpdateInput;
    }): Promise<OrderDetail>;
    countOrderDetails(where?: Prisma.OrderDetailWhereInput): Promise<number>;
    deleteOrderDetail(where: Prisma.OrderDetailWhereUniqueInput): Promise<OrderDetail>;
}
