
import { Module } from '@nestjs/common';
import { CartItemService } from './cartItem.service';
import { CartItemController } from './cartItem.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [],
  controllers: [CartItemController],
  providers: [CartItemService, PrismaService],
})
export class CartItemModule {}
