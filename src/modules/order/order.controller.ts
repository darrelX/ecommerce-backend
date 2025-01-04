
import { Controller, Get, Query, Param, Post, Delete, Put, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrder(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
    @Query('page') page: string = '1'
  ): Promise<{ total: number, page: number, data: Order[] }> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    };

    
    const orders = await this.orderService.orders(params);
    const total = await this.orderService.countOrders(params.where);
    return {
      total : total,
       page: Number(page),
       data : orders,
    };
  }
  
  @Get(':id')
  async getOrders(@Param('id') id: string): Promise<Order | null> {
    return this.orderService.order({ id: Number(id) });
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() data: Prisma.OrderUpdateInput,
  ): Promise<Order> {
    return this.orderService.updateOrder({
      where: { id: Number(id) },
      data,
    });
  }

  @Post('')
  async createOrder(@Body() orderData: Prisma.OrderCreateInput): Promise<Order> {
    return this.orderService.createOrder(orderData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.deleteOrder({ id: Number(id) });
  }
}
