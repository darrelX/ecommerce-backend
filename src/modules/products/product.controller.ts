import { Controller, Get, Query, Param, Post, Delete, Put, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, Prisma } from '@prisma/client';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  @ApiOperation({ summary: 'Get products' })
  @ApiQuery({ name: 'skip', required: false, type: String, example: '0' })
  @ApiQuery({ name: 'take', required: false, type: String, example: '10' })
  @ApiQuery({ name: 'cursor', required: false, type: String, example: '' })
  @ApiQuery({ name: 'where', required: false, type: String, example: '' })
  @ApiQuery({ name: 'sort', required: false, type: String, example: 'name' })
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
            "price": "250",
            "name": "XX",
            "description": "Plantain Mais et Poisson",
            "image": "https://www.google.com",
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
  async getproducts(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('sortby_order') sortbyOrder?: 'asc' | 'desc',
    @Query('page') page: string = '1'
  ): Promise<{ total: number, page: number, data: Product[] }> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      orderBy: sortbyOrder ? JSON.parse(sortbyOrder) : undefined,
    };


    const products = await this.productService.products(params);
    const total = await this.productService.countProducts(params.where);
    return {
      total: total,
      page: Number(page),
      data: products,
    };
  }

  @Get(':id')
  async getproduct(@Param('id') id: string): Promise<Product | null> {
    return this.productService.product({ id: Number(id) });
  }

  @Put(':id')
  async updateproduct(
    @Param('id') id: string,
    @Body() data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.productService.updateProduct({
      where: { id: Number(id) },
      data,
    });
  }

  @Post('')
  @ApiOperation({ summary: 'Create product' })
  @ApiBody({
    type: 'Prisma.ProductCreateInput',
    schema: {
      example: { price: "250", name: "XX", description: "Plantain Mais et Poisson", image: "https://www.google.com", category: "1" },
    }
  })
  @ApiResponse({
    status: 201, description: 'Product created successfully.',
    schema: {
      example: {
        "price": "250",
        "name": "XX",
        "description": "Plantain Mais et Poisson",
        "image": "https://www.google.com",
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
  async createproduct(@Body() productData: Prisma.ProductCreateInput): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  @Delete(':id')
  async deleteproduct(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct({ id: Number(id) });
  }
}