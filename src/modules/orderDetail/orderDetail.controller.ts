
import { Controller, Get, Query, Param, Post, Delete, Put, Body } from '@nestjs/common';
import { OrderDetailService } from './orderDetail.service';
import { OrderDetail } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('orderDetail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get()
    @ApiOperation({ summary: 'Get orderDetail cateory' })
    @ApiQuery({ name: 'skip', required: false, type: String, example: '0' })
    @ApiQuery({ name: 'take', required: false, type: String, example: '10' })
    @ApiQuery({ name: 'cursor', required: false, type: String, example: '' })
    @ApiQuery({ name: 'where', required: false, type: String, example: '' })
    @ApiQuery({ name: 'sort', required: false, type: String, example: '' })
    @ApiQuery({
      name: 'sortby_order',
      required: false,
      enum: ['asc', 'desc'],
      example: 'asc'
    })
    @ApiQuery({ name: 'page', required: false, type: String, example: '1' })
    @ApiResponse({
      status: 200, description: 'List of users returned successfully.',
      schema: {
        example: {
          "total": 1,
          "page": 1,
          "data": [
            {
              "id": 2,
              "category_name": "@gmail.com",
              "description": "description",
              "createdAt": "2025-01-05T15:54:59.837Z",
              "updatedAt": "2025-01-05T15:54:59.835Z"
            }
          ]
        }
      },
    })
    @ApiResponse({
      status: 400,
      description: 'Bad Request.',
      schema: {
        example: {
          statusCode: 400,
          message: 'Invalid input data',
        },
      },
    })
    @ApiResponse({
      status: 500,
      description: 'Internal Server Error.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal server error',
        },
      },
    })
  async getOrderDetail(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('sortby_order') sortby_order?: string,
    @Query('page') page: string = '1'
  ): Promise<{ total: number, page: number, data: OrderDetail[] }> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      sortby_order: sortby_order ? JSON.parse(sortby_order) : undefined,
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
