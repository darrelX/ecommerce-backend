import { $Enums, Order } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
export declare class CreateOrderDto implements Order {
    id: number;
    user_id: number;
    orderDetails: Array<{
        product_id: number;
        quantity: number;
        price: number;
    }>;
    status: $Enums.Status;
    amount: Decimal;
    createdAt: Date;
    updatedAt: Date;
}
