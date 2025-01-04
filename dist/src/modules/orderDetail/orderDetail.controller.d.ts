import { OrderDetailService } from './orderDetail.service';
import { OrderDetail } from '@prisma/client';
import { Prisma } from '@prisma/client';
export declare class OrderDetailController {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    getOrderDetail(skip?: string, take?: string, cursor?: string, where?: string, orderBy?: string, page?: string): Promise<{
        total: number;
        page: number;
        data: OrderDetail[];
    }>;
    getOrderDetails(id: string): Promise<OrderDetail | null>;
    updateOrderDetail(id: string, data: Prisma.OrderDetailUpdateInput): Promise<OrderDetail>;
    createOrderDetail(orderDetailData: Prisma.OrderDetailCreateInput): Promise<OrderDetail>;
    deleteOrderDetail(id: string): Promise<OrderDetail>;
}
