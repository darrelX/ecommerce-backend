
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Cart, Prisma } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async cart(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
  ): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: cartWhereUniqueInput,
    });
  }

  async carts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CartWhereUniqueInput;
    where?: Prisma.CartWhereInput;
    orderBy?: Prisma.CartOrderByWithRelationInput;
  }): Promise<Cart[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.cart.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCart(data: Prisma.CartCreateInput): Promise<Cart> {
    return this.prisma.cart.create({
      data,
    });
  }

  async updateCart(params: {
    where: Prisma.CartWhereUniqueInput;
    data: Prisma.CartUpdateInput;
  }): Promise<Cart> {
    const { where, data } = params;
    return this.prisma.cart.update({
      data,
      where,
    });
  }

  async countCarts(where?: Prisma.CartWhereInput): Promise<number> {
    return this.prisma.cart.count({
      where,
    });
  }

  async deleteCart(where: Prisma.CartWhereUniqueInput): Promise<Cart> {
    return this.prisma.cart.delete({
      where,
    });
  }
}

