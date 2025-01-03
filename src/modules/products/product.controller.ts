import { Controller, Get, Query, Param, Post, Delete, Put, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getproducts(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
    @Query('page') page: string = '1'
  ): Promise<{ total: number, page: number, data: Product[] }> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    };

    
    const products = await this.productService.products(params);
    const total = await this.productService.countProducts(params.where);
    return {
      total : total,
       page: Number(page),
       data : products,
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
  async createproduct(@Body() productData: Prisma.ProductCreateInput): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  @Delete(':id')
  async deleteproduct(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct({ id: Number(id) });
  }
}