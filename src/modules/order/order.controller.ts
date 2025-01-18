
import { Controller, Get, Query, Param, Post, Delete, Put, Body, HttpException, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order, Prisma, OrderDetail } from '@prisma/client';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('')
  @ApiOperation({ summary: 'Get order\'s cateory' })
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
  async getOrder(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('sortby_order') sortby_order?: string,
    @Query('page') page: string = '1'
  ): Promise<{ total: number, page: number, data: Order[] }> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      sortby_order: sortby_order ? JSON.parse(sortby_order) : undefined,
    };


    const orders = await this.orderService.orders(params);
    const total = await this.orderService.countOrders(params.where);
    return {
      total: total,
      page: Number(page),
      data: orders,
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

  @Post()
  @ApiBody({
    // type: CreateOrderDto,
    schema: {
      type: 'object',
      example: {
        user_id: 123,
        order_id: 456,
        orderDetails: [
          { product_id: 1, quantity: 2, price: 15.50 },
          { product_id: 2, quantity: 1, price: 45.00 },
          { product_id: 3, quantity: 3, price: 10.00 },
        ],
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully.',
    schema: {
      example: {
        id: 1,
        user_id: 123,
        amount: 100.50,
        status: 'Pending',
        orderDetails: [
          { product_id: 1, quantity: 2, price: 15.50 },
          { product_id: 2, quantity: 1, price: 45.00 },
          { product_id: 3, quantity: 3, price: 10.00 },
        ],
      },
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
  async createOrder(
    @Body()
    createOrderDto : CreateOrderDto,
  ) {
    try {      
      const { user_id, orderDetails } = createOrderDto;
      const createdOrder = await this.orderService.createOrderWithProducts(
        user_id,
        orderDetails,
      );

      return createdOrder;
    } catch (error) {
      throw new HttpException(
        {
          message: 'An error occurred while creating the order.',
          error: error.message || error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.deleteOrder({ id: Number(id) });
  }
}
