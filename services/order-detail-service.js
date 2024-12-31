const prisma = require('../middleware/middleware');

async function createOrderDetail(orderId, productId, quantity) {
  // Vérifie si le produit existe
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error('Produit introuvable');
  }

  // Créer un détail de commande
  const orderDetail = await prisma.orderDetail.create({
    data: {
      orderId,
      productId,
      quantity,
      price: product.price, // Prix unitaire du produit
    },
  });

  return orderDetail;
}

async function updateOrderTotal(orderId) {
  // Récupérer tous les détails de la commande
  const orderDetails = await prisma.orderDetail.findMany({
    where: { orderId },
  });

  // Calculer le montant total
  const totalAmount = orderDetails.reduce((sum, detail) => {
    return sum + detail.price * detail.quantity;
  }, 0);

  // Mettre à jour la commande
  await prisma.order.update({
    where: { id: orderId },
    data: { amount: totalAmount },
  });
}

module.exports = {
  createOrderDetail,
  updateOrderTotal,
};
