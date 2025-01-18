import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateProductDto implements Product {

  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  price: Decimal;

  @IsOptional()
  @IsString()
  image: string;

  @IsNumber()
  category_id: number;

  @IsOptional()
  @IsDate({ message: 'La date de création (createdAt) doit être une date valide.' })
  createdAt: Date;

  @IsOptional()
  @IsDate({ message: 'La date de mise à jour (updatedAt) doit être une date valide.' })
  updatedAt: Date;

}