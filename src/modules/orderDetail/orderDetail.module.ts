
import { Module } from '@nestjs/common';
import { OrderDetailService } from './orderDetail.service';
import { OrderDetailController } from './orderDetail.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [],
  controllers: [OrderDetailController],
  providers: [OrderDetailService, PrismaService],
})
export class OrderDetailModule {}
