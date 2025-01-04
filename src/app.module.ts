import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { PrismaService } from './prisma.service';
import { ProductModule } from './modules/products/product.module';
import { ProductCategoryModule } from './modules/productCategory/productCategory.module';
import { OrderDetailModule } from './modules/orderDetail/orderDetail.module';
import { OrderModule } from './modules/order/order.module';


@Module({
  imports: [UserModule, ProductModule, ProductCategoryModule, OrderDetailModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }