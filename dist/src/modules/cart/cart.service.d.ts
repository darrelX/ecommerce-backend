import { PrismaService } from '../../prisma.service';
import { Cart, Prisma } from '@prisma/client';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    cart(cartWhereUniqueInput: Prisma.CartWhereUniqueInput): Promise<Cart | null>;
    carts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CartWhereUniqueInput;
        where?: Prisma.CartWhereInput;
        orderBy?: Prisma.CartOrderByWithRelationInput;
    }): Promise<Cart[]>;
    createCart(data: Prisma.CartCreateInput): Promise<Cart>;
    updateCart(params: {
        where: Prisma.CartWhereUniqueInput;
        data: Prisma.CartUpdateInput;
    }): Promise<Cart>;
    countCarts(where?: Prisma.CartWhereInput): Promise<number>;
    deleteCart(where: Prisma.CartWhereUniqueInput): Promise<Cart>;
}
