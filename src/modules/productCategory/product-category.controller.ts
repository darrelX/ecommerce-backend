
import { Controller, Get, Query, Param, Post, Delete, Put, Body, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ProductCategoryService } from './productCategory.service';
import { ProductCategory } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('product-category')
@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) { }

  @Get()
  @ApiOperation({ summary: 'Get product\'s cateory' })
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
  async getProductCategory(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('sortby_order') sortby_order?: string,
    @Query('page') page: string = '1'
  ): Promise<{ total: number, page: number, data: ProductCategory[] }> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      sortby_order: sortby_order ? JSON.parse(sortby_order) : undefined,
    };


    const productCategorys = await this.productCategoryService.productCategorys(params);
    const total = await this.productCategoryService.countProductCategorys(params.where);
    return {
      total: total,
      page: Number(page),
      data: productCategorys,
    };
  }

  @Get(':id')
  async getProductCategorys(@Param('id') id: string): Promise<ProductCategory | null> {
    try {
      return this.productCategoryService.productCategory({ id: Number(id) });

    } catch (error) {
      throw new HttpException(
        { message: 'An error occurred while retrieving users.', error: error.message || error },
        HttpStatus.BAD_REQUEST,
      );

    }
  }

  @Put(':id')
  async updateProductCategory(
    @Param('id') id: string,
    @Body() data: Prisma.ProductCategoryUpdateInput,
  ): Promise<ProductCategory> {
    return this.productCategoryService.updateProductCategory({
      where: { id: Number(id) },
      data,
    });
  }

  @Post('')
  @ApiBody({
    type: "",
    schema: {
      example: {
        categoryName: "Juices",
        description: "It's my passion"
      }
    }
  })
  @ApiResponse({
    status: 201, description: 'Product created successfully.',
    schema: {
      example: {
        "price": "250",
        "name": "XX",
        "description": "Plantain Mais et Poisson",
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
  async createProductCategory(@Body() productCategoryData: Prisma.ProductCategoryCreateInput): Promise<ProductCategory> {
    try {
      return await this.productCategoryService.createProductCategory(productCategoryData);

    } catch (error) {
      throw new HttpException(
        { message: 'An error occurred while retrieving users.', error: error.message || error },
        HttpStatus.BAD_REQUEST,
      );

    }
  }

  @Delete(':id')
  async deleteProductCategory(@Param('id') id: string): Promise<ProductCategory> {
    try {
      return await this.productCategoryService.deleteProductCategory({ id: Number(id) });

    } catch (error) {
      throw new HttpException(
        { message: 'An error occurred while retrieving users.', error: error.message || error },
        HttpStatus.BAD_REQUEST,
      );

    }
  }
}
