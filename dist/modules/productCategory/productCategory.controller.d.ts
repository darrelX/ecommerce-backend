import { ProductCategoryService } from './productCategory.service';
import { ProductCategory } from '@prisma/client';
import { Prisma } from '@prisma/client';
export declare class ProductCategoryController {
    private readonly productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
    getProductCategory(skip?: string, take?: string, cursor?: string, where?: string, orderBy?: string, page?: string): Promise<{
        total: number;
        page: number;
        data: ProductCategory[];
    }>;
    getProductCategorys(id: string): Promise<ProductCategory | null>;
    updateProductCategory(id: string, data: Prisma.ProductCategoryUpdateInput): Promise<ProductCategory>;
    createProductCategory(productCategoryData: Prisma.ProductCategoryCreateInput): Promise<ProductCategory>;
    deleteProductCategory(id: string): Promise<ProductCategory>;
}
