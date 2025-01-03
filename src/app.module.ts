import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { PrismaService } from './prisma.service';
import {ProductModule} from './modules/products/product.module';
import { ProductCategoryModule } from './modules/productCategory/productCategory.module';


@Module({
  imports: [UserModule, ProductModule, ProductCategoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}