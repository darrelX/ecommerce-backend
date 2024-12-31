const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const orderDetailMiddleware = async (params, next) => {
  if (params.model === 'OrderDetail' && params.action === 'create') {
    const data = params.args.data;

    // Récupérer le produit correspondant
    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (product) {
      // Mettre à jour les champs `price` et `quantity`
      data.price = product.price;
      data.quantity = data.quantity || 1;
    }
  }

  return next(params);
};

module.exports = {orderDetailMiddleware};
