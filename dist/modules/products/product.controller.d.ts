import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { Prisma } from '@prisma/client';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getproducts(skip?: string, take?: string, cursor?: string, where?: string, orderBy?: string, page?: string): Promise<{
        total: number;
        page: number;
        data: Product[];
    }>;
    getproduct(id: string): Promise<Product | null>;
    updateproduct(id: string, data: Prisma.ProductUpdateInput): Promise<Product>;
    createproduct(productData: Prisma.ProductCreateInput): Promise<Product>;
    deleteproduct(id: string): Promise<Product>;
}
