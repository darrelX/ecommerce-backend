import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
export declare class CreateProductDto implements Product {
    id: number;
    name: string;
    description: string;
    price: Decimal;
    image: string;
    category_id: number;
    createdAt: Date;
    updatedAt: Date;
}
