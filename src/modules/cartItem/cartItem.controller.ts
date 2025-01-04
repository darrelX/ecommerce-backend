
import { Controller, Get, Query, Param, Post, Delete, Put, Body } from '@nestjs/common';
import { CartItemService } from './cartItem.service';
import { CartItem } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Controller('cartItem')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get()
  async getCartItem(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
    @Query('page') page: string = '1'
  ): Promise<{ total: number, page: number, data: CartItem[] }> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    };

    
    const cartItems = await this.cartItemService.cartItems(params);
    const total = await this.cartItemService.countCartItems(params.where);
    return {
      total : total,
       page: Number(page),
       data : cartItems,
    };
  }
  
  @Get(':id')
  async getCartItems(@Param('id') id: string): Promise<CartItem | null> {
    return this.cartItemService.cartItem({ id: Number(id) });
  }

  @Put(':id')
  async updateCartItem(
    @Param('id') id: string,
    @Body() data: Prisma.CartItemUpdateInput,
  ): Promise<CartItem> {
    return this.cartItemService.updateCartItem({
      where: { id: Number(id) },
      data,
    });
  }

  @Post('')
  async createCartItem(@Body() cartItemData: Prisma.CartItemCreateInput): Promise<CartItem> {
    return this.cartItemService.createCartItem(cartItemData);
  }

  @Delete(':id')
  async deleteCartItem(@Param('id') id: string): Promise<CartItem> {
    return this.cartItemService.deleteCartItem({ id: Number(id) });
  }
}
