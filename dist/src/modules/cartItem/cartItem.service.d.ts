import { PrismaService } from '../../prisma.service';
import { CartItem, Prisma } from '@prisma/client';
export declare class CartItemService {
    private prisma;
    constructor(prisma: PrismaService);
    cartItem(cartItemWhereUniqueInput: Prisma.CartItemWhereUniqueInput): Promise<CartItem | null>;
    cartItems(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CartItemWhereUniqueInput;
        where?: Prisma.CartItemWhereInput;
        orderBy?: Prisma.CartItemOrderByWithRelationInput;
    }): Promise<CartItem[]>;
    createCartItem(data: Prisma.CartItemCreateInput): Promise<CartItem>;
    updateCartItem(params: {
        where: Prisma.CartItemWhereUniqueInput;
        data: Prisma.CartItemUpdateInput;
    }): Promise<CartItem>;
    countCartItems(where?: Prisma.CartItemWhereInput): Promise<number>;
    deleteCartItem(where: Prisma.CartItemWhereUniqueInput): Promise<CartItem>;
}
