
import { Controller, Get, Query, Param, Post, Delete, Put, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
    @Query('page') page: string = '1'
  ): Promise<{ total: number, page: number, data: Cart[] }> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    };

    
    const carts = await this.cartService.carts(params);
    const total = await this.cartService.countCarts(params.where);
    return {
      total : total,
       page: Number(page),
       data : carts,
    };
  }
  
  @Get(':id')
  async getCarts(@Param('id') id: string): Promise<Cart | null> {
    return this.cartService.cart({ id: Number(id) });
  }

  @Put(':id')
  async updateCart(
    @Param('id') id: string,
    @Body() data: Prisma.CartUpdateInput,
  ): Promise<Cart> {
    return this.cartService.updateCart({
      where: { id: Number(id) },
      data,
    });
  }

  @Post('')
  async createCart(@Body() cartData: Prisma.CartCreateInput): Promise<Cart> {
    return this.cartService.createCart(cartData);
  }

  @Delete(':id')
  async deleteCart(@Param('id') id: string): Promise<Cart> {
    return this.cartService.deleteCart({ id: Number(id) });
  }
}
