import { OrderService } from './order.service';
import { Order } from '@prisma/client';
import { Prisma } from '@prisma/client';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrder(skip?: string, take?: string, cursor?: string, where?: string, orderBy?: string, page?: string): Promise<{
        total: number;
        page: number;
        data: Order[];
    }>;
    getOrders(id: string): Promise<Order | null>;
    updateOrder(id: string, data: Prisma.OrderUpdateInput): Promise<Order>;
    createOrder(orderData: Prisma.OrderCreateInput): Promise<Order>;
    deleteOrder(id: string): Promise<Order>;
}
