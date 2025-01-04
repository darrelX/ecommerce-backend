import { CartItemService } from './cartItem.service';
import { CartItem } from '@prisma/client';
import { Prisma } from '@prisma/client';
export declare class CartItemController {
    private readonly cartItemService;
    constructor(cartItemService: CartItemService);
    getCartItem(skip?: string, take?: string, cursor?: string, where?: string, orderBy?: string, page?: string): Promise<{
        total: number;
        page: number;
        data: CartItem[];
    }>;
    getCartItems(id: string): Promise<CartItem | null>;
    updateCartItem(id: string, data: Prisma.CartItemUpdateInput): Promise<CartItem>;
    createCartItem(cartItemData: Prisma.CartItemCreateInput): Promise<CartItem>;
    deleteCartItem(id: string): Promise<CartItem>;
}
