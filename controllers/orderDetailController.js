const { createOrderDetail, updateOrderTotal } = require('../services/order-detail-service');

async function addOrderDetail(req, res) {
  const { orderId, productId, quantity } = req.body;

  try {
    // Créer un détail de commande
    const orderDetail = await createOrderDetail(orderId, productId, quantity);

    // Recalculer le montant total de la commande
    await updateOrderTotal(orderId);

    res.status(201).json(orderDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  addOrderDetail,
};
