
import { Controller, Get, Query, Param, Post, Delete, Put, Body } from '@nestjs/common';
import { OrderDetailService } from './orderDetail.service';
import { OrderDetail } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Controller('orderDetail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get()
  async getOrderDetail(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
    @Query('page') page: string = '1'
  ): Promise<{ total: number, page: number, data: OrderDetail[] }> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    };

    
    const orderDetails = await this.orderDetailService.orderDetails(params);
    const total = await this.orderDetailService.countOrderDetails(params.where);
    return {
      total : total,
       page: Number(page),
       data : orderDetails,
    };
  }
  
  @Get(':id')
  async getOrderDetails(@Param('id') id: string): Promise<OrderDetail | null> {
    return this.orderDetailService.orderDetail({ id: Number(id) });
  }

  @Put(':id')
  async updateOrderDetail(
    @Param('id') id: string,
    @Body() data: Prisma.OrderDetailUpdateInput,
  ): Promise<OrderDetail> {
    return this.orderDetailService.updateOrderDetail({
      where: { id: Number(id) },
      data,
    });
  }

  @Post('')
  async createOrderDetail(@Body() orderDetailData: Prisma.OrderDetailCreateInput): Promise<OrderDetail> {
    const orderDetail = await this.orderDetailService.createOrderDetail(1, 1, 1);
    await this.orderDetailService.updateOrderTotal(1);
    return orderDetail;
  }

  @Delete(':id')
  async deleteOrderDetail(@Param('id') id: string): Promise<OrderDetail> {
    return this.orderDetailService.deleteOrderDetail({ id: Number(id) });
  }
}
