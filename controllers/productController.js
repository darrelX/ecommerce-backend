const prisma = require('../middleware/middleware')


const createProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, price, description, image },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany(); // Equivalent à findAll
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, price, description, image },
    });
    res.status(200).json(product);
  } catch (error) {
    if (error.code === 'P2025') { // Prisma error for "record not found"
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') { // Prisma error for "record not found"
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
