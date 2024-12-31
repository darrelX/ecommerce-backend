// const { prisma } = require('../index');
const prisma = require('../middleware/middleware.js')


const createUser = async (req, res) => {
  const { name, password, city, tel, birthday, email } = req.body;
  // console.log(name, password, city, tel, birthday, email);
  
  try {
    const user = await prisma.user.create({
      data: { name: name, password: password, city: city, tel: tel, birthday: birthday, email: email },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {

  try {
    const users = await prisma.user.findMany(); // Equivalent à findAll dans Sequelize
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } }); // Equivalent à findByPk
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {

  const { id } = req.params;
  const { name, password, city, tel, birthday, email } = req.body;
  try {
    console.log(id);
    console.log(name, password, city, tel, birthday, email);

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name: name, password: password, city: city, tel: tel, birthday: birthday, email: email },
    });
    console.log(name, password, city, tel, birthday, email);

    res.status(200).json(user);
  } catch (error) {
    if (error.code === 'P2025') { // Prisma error for "record not found"
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') { // Prisma error for "record not found"
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
