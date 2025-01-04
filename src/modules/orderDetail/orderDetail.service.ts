
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { OrderDetail, Prisma, Product } from '@prisma/client';

@Injectable()
export class OrderDetailService {
  constructor(private prisma: PrismaService) { }

  async orderDetail(
    orderDetailWhereUniqueInput: Prisma.OrderDetailWhereUniqueInput,
  ): Promise<OrderDetail | null> {
    return this.prisma.orderDetail.findUnique({
      where: orderDetailWhereUniqueInput,
    });
  }

  async orderDetails(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderDetailWhereUniqueInput;
    where?: Prisma.OrderDetailWhereInput;
    orderBy?: Prisma.OrderDetailOrderByWithRelationInput;
  }): Promise<OrderDetail[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.orderDetail.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // async createOrderDetail(data: Prisma.OrderDetailCreateInput): Promise<OrderDetail> {
  //   return this.prisma.orderDetail.create({
  //     data,
  //   });
  // }

  async createOrderDetail(orderId: number, productId: number, quantity: number): Promise<OrderDetail> {
    // Vérifie si le produit existe
    const product: Product | null = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Produit introuvable');
    }

    // Créer un détail de commande
    const orderDetail: OrderDetail = await this.prisma.orderDetail.create({
      data: {
        orderId,
        productId,
        quantity,
        price: product.price, // Prix unitaire du produit
      },
    });

    return orderDetail;
  }

  async updateOrderTotal(orderId: number): Promise<void> {
    // Récupérer tous les détails de la commande
    const orderDetails: OrderDetail[] = await this.prisma.orderDetail.findMany({
      where: { orderId },
    });

    // Calculer le montant total
    const totalAmount: number = orderDetails.reduce((sum, detail) => {
      return sum + Number(detail.price) * detail.quantity;
    }, 0);

    // Mettre à jour la commande
    await this.prisma.order.update({
      where: { id: orderId },
      data: { amount: totalAmount },
    });

    // return orderDetails;
  }

  async updateOrderDetail(params: {
    where: Prisma.OrderDetailWhereUniqueInput;
    data: Prisma.OrderDetailUpdateInput;
  }): Promise<OrderDetail> {
    const { where, data } = params;
    return this.prisma.orderDetail.update({
      data,
      where,
    });
  }

  async countOrderDetails(where?: Prisma.OrderDetailWhereInput): Promise<number> {
    return this.prisma.orderDetail.count({
      where,
    });
  }

  async deleteOrderDetail(where: Prisma.OrderDetailWhereUniqueInput): Promise<OrderDetail> {
    return this.prisma.orderDetail.delete({
      where,
    });
  }
}

