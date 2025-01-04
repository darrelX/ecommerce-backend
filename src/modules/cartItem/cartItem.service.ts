
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CartItem, Prisma } from '@prisma/client';

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  async cartItem(
    cartItemWhereUniqueInput: Prisma.CartItemWhereUniqueInput,
  ): Promise<CartItem | null> {
    return this.prisma.cartItem.findUnique({
      where: cartItemWhereUniqueInput,
    });
  }

  async cartItems(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CartItemWhereUniqueInput;
    where?: Prisma.CartItemWhereInput;
    orderBy?: Prisma.CartItemOrderByWithRelationInput;
  }): Promise<CartItem[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.cartItem.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCartItem(data: Prisma.CartItemCreateInput): Promise<CartItem> {
    return this.prisma.cartItem.create({
      data,
    });
  }

  async updateCartItem(params: {
    where: Prisma.CartItemWhereUniqueInput;
    data: Prisma.CartItemUpdateInput;
  }): Promise<CartItem> {
    const { where, data } = params;
    return this.prisma.cartItem.update({
      data,
      where,
    });
  }

  async countCartItems(where?: Prisma.CartItemWhereInput): Promise<number> {
    return this.prisma.cartItem.count({
      where,
    });
  }

  async deleteCartItem(where: Prisma.CartItemWhereUniqueInput): Promise<CartItem> {
    return this.prisma.cartItem.delete({
      where,
    });
  }
}

