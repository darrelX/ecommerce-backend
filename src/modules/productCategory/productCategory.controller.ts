
import { Controller, Get, Query, Param, Post, Delete, Put, Body } from '@nestjs/common';
import { ProductCategoryService } from './productCategory.service';
import { ProductCategory } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Controller('productCategory')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Get()
  async getProductCategory(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
    @Query('page') page: string = '1'
  ): Promise<{ total: number, page: number, data: ProductCategory[] }> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    };

    
    const productCategorys = await this.productCategoryService.productCategorys(params);
    const total = await this.productCategoryService.countProductCategorys(params.where);
    return {
      total : total,
       page: Number(page),
       data : productCategorys,
    };
  }
  
  @Get(':id')
  async getProductCategorys(@Param('id') id: string): Promise<ProductCategory | null> {
    return this.productCategoryService.productCategory({ id: Number(id) });
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
  async createProductCategory(@Body() productCategoryData: Prisma.ProductCategoryCreateInput): Promise<ProductCategory> {
    return this.productCategoryService.createProductCategory(productCategoryData);
  }

  @Delete(':id')
  async deleteProductCategory(@Param('id') id: string): Promise<ProductCategory> {
    return this.productCategoryService.deleteProductCategory({ id: Number(id) });
  }
}
