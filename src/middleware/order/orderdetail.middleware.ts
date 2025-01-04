import { Prisma, PrismaClient, OrderDetail, Product } from '@prisma/client';

// Instance Prisma
const prisma = new PrismaClient();

// Middleware TypeScript
export const orderDetailMiddleware: Prisma.Middleware = async (params, next) => {
  // console.log("ok");
  
  // Vérifier si le middleware concerne la table OrderDetail et l'action create
  if (params.model === 'OrderDetail' && params.action === 'create') {
    const data : OrderDetail = params.args.data;

    // Vérifier que les données sont valides
    if (!data.productId) {
      throw new Error('Le champ productId est requis pour créer un OrderDetail.');
    }

    // Récupérer le produit correspondant
    const product : Product = await prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) {
      throw new Error('Produit introuvable.');
    }

    // Mettre à jour les champs `price` et `quantity`
    data.price = product.price;
    data.quantity = data.quantity || 1;
  }

  // Passer au prochain middleware ou exécuter la requête
  return next(params);
};
