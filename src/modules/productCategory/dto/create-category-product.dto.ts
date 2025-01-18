import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { ProductCategory } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateProductCategoryDto implements ProductCategory {

  @IsNumber()
  id: number;

  @IsString()
  categoryName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate({ message: 'La date de création (createdAt) doit être une date valide.' })
  createdAt: Date;

  @IsOptional()
  @IsDate({ message: 'La date de mise à jour (updatedAt) doit être une date valide.' })
  updatedAt: Date;

}