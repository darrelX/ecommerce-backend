import { CartService } from './cart.service';
import { Cart } from '@prisma/client';
import { Prisma } from '@prisma/client';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(skip?: string, take?: string, cursor?: string, where?: string, orderBy?: string, page?: string): Promise<{
        total: number;
        page: number;
        data: Cart[];
    }>;
    getCarts(id: string): Promise<Cart | null>;
    updateCart(id: string, data: Prisma.CartUpdateInput): Promise<Cart>;
    createCart(cartData: Prisma.CartCreateInput): Promise<Cart>;
    deleteCart(id: string): Promise<Cart>;
}
