import { PrismaService } from '../../prisma.service';
import { ProductCategory, Prisma } from '@prisma/client';
export declare class ProductCategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    productCategory(productCategoryWhereUniqueInput: Prisma.ProductCategoryWhereUniqueInput): Promise<ProductCategory | null>;
    productCategorys(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProductCategoryWhereUniqueInput;
        where?: Prisma.ProductCategoryWhereInput;
        orderBy?: Prisma.ProductCategoryOrderByWithRelationInput;
    }): Promise<ProductCategory[]>;
    createProductCategory(data: Prisma.ProductCategoryCreateInput): Promise<ProductCategory>;
    updateProductCategory(params: {
        where: Prisma.ProductCategoryWhereUniqueInput;
        data: Prisma.ProductCategoryUpdateInput;
    }): Promise<ProductCategory>;
    countProductCategorys(where?: Prisma.ProductCategoryWhereInput): Promise<number>;
    deleteProductCategory(where: Prisma.ProductCategoryWhereUniqueInput): Promise<ProductCategory>;
}
