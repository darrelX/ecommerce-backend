import { ProductCategory } from '@prisma/client';
export declare class CreateProductCategoryDto implements ProductCategory {
    id: number;
    categoryName: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
