import { OrderService } from './order.service';
import { Order, Prisma } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrder(skip?: string, take?: string, cursor?: string, where?: string, sortby_order?: string, page?: string): Promise<{
        total: number;
        page: number;
        data: Order[];
    }>;
    getOrders(id: string): Promise<Order | null>;
    updateOrder(id: string, data: Prisma.OrderUpdateInput): Promise<Order>;
    createOrder(createOrderDto: CreateOrderDto): Promise<{
        id: number;
        amount: Prisma.Decimal;
        status: import(".prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        user_id: number;
    }>;
    deleteOrder(id: string): Promise<Order>;
}
