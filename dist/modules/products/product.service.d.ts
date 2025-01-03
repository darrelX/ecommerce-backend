import { PrismaService } from '../../prisma.service';
import { Product, Prisma } from '@prisma/client';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    product(productWhereUniqueInput: Prisma.ProductWhereUniqueInput): Promise<Product | null>;
    products(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProductWhereUniqueInput;
        where?: Prisma.ProductWhereInput;
        orderBy?: Prisma.ProductOrderByWithRelationInput;
    }): Promise<Product[]>;
    createProduct(data: Prisma.ProductCreateInput): Promise<Product>;
    updateProduct(params: {
        where: Prisma.ProductWhereUniqueInput;
        data: Prisma.ProductUpdateInput;
    }): Promise<Product>;
    countProducts(where?: Prisma.ProductWhereInput): Promise<number>;
    deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product>;
}
