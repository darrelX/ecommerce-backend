
import { Module } from '@nestjs/common';
import { ProductCategoryService } from './productCategory.service';
import { ProductCategoryController } from './productCategory.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, PrismaService],
})
export class ProductCategoryModule {}
