
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Order, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async order(
    orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
  ): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: orderWhereUniqueInput,
    });
  }

  async orders(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createOrderWithProducts(
    user_id: number,
    products: Array<{ product_id: number; quantity: number; price: number }>,
  ) {
    return this.prisma.$transaction(async (prisma) => {
      
      
      // Récupérer tous les IDs des produits mentionnés dans la requête
      const product_ids = products.map((p) => p.product_id);

  
      // Vérifier que tous les produits existent
      const existingProducts = await prisma.product.findMany({
        where: { id: { in: product_ids } },
        select: { id: true },
      });
  
      const existingProductIds = existingProducts.map((p) => p.id);
  
      // Identifier les IDs invalides
      const invalidProductIds = product_ids.filter((id) => !existingProductIds.includes(id));
  
      if (invalidProductIds.length > 0) {
        
        throw new Error(
          `Invalid product IDs: ${invalidProductIds.join(', ')}`,
        );
      }
  
      // Calculer le montant total de la commande
      const totalAmount = products.reduce((sum, p) => sum + p.quantity *  p.price, 0);
  
      // Créer la commande
      const order = await prisma.order.create({
        data: {
          user_id,
          status: 'Pending',
          amount: totalAmount,
        },
      });
  
      // Associer les produits à la commande
      const orderDetails : Prisma.OrderDetailCreateManyInput[] = products.map((p) => ({
        order_id: order.id,
        product_id: p.product_id,
        quantity: p.quantity,
        price: p.price,
      }));
  
      await prisma.orderDetail.createMany({
        data: orderDetails,
      });
  
      return order;
    });
  }
  

  async createOrder(data: Prisma.OrderCreateInput, orderDetail: Prisma.OrderDetailCreateInput[]): Promise<Order> {
    return this.prisma.order.create({
      data: {
        ...data,
        orderDetails: {
          create: orderDetail
        }
      },
      include: {
        orderDetails: true
      }
    });
  }

  async updateOrder(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUpdateInput;
  }): Promise<Order> {
    const { where, data } = params;
    return this.prisma.order.update({
      data,
      where,
    });
  }

  async countOrders(where?: Prisma.OrderWhereInput): Promise<number> {
    return this.prisma.order.count({
      where,
    });
  }

  async deleteOrder(where: Prisma.OrderWhereUniqueInput): Promise<Order> {
    return this.prisma.order.delete({
      where,
    });
  }
}

