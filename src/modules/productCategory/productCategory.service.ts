
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ProductCategory, Prisma } from '@prisma/client';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async productCategory(
    productCategoryWhereUniqueInput: Prisma.ProductCategoryWhereUniqueInput,
  ): Promise<ProductCategory | null> {
    return this.prisma.productCategory.findUnique({
      where: productCategoryWhereUniqueInput,
    });
  }

  async productCategorys(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductCategoryWhereUniqueInput;
    where?: Prisma.ProductCategoryWhereInput;
    orderBy?: Prisma.ProductCategoryOrderByWithRelationInput;
  }): Promise<ProductCategory[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.productCategory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProductCategory(data: Prisma.ProductCategoryCreateInput): Promise<ProductCategory> {
    return this.prisma.productCategory.create({
      data,
    });
  }

  async updateProductCategory(params: {
    where: Prisma.ProductCategoryWhereUniqueInput;
    data: Prisma.ProductCategoryUpdateInput;
  }): Promise<ProductCategory> {
    const { where, data } = params;
    return this.prisma.productCategory.update({
      data,
      where,
    });
  }

  async countProductCategorys(where?: Prisma.ProductCategoryWhereInput): Promise<number> {
    return this.prisma.productCategory.count({
      where,
    });
  }

  async deleteProductCategory(where: Prisma.ProductCategoryWhereUniqueInput): Promise<ProductCategory> {
    return this.prisma.productCategory.delete({
      where,
    });
  }
}

