// const sequelize = require('../database');
// const User = require('../models/User');
// const Product = require('../models/Product');
// const { faker } = require('@faker-js/faker');

// const generateFakeUser = () => ({
//   name: faker.internet.username(),
//   email: faker.internet.email(),
//   password: faker.internet.password(),
//   city: faker.location.city(),
//   tel: faker.phone.number(),
//   birthday: faker.date.birthdate(),
// });

// const generateFakeProduct = () => ({
//   productName: faker.commerce.productName(),
//   price: faker.commerce.price(),
//   description: faker.commerce.productDescription(),
//   image: faker.image.avatar(),
// });

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//     // Effacer les données des tables
//     // await User.drop();
//     await User.truncate();
//     await Product.truncate();

//   // Ajouter des utilisateurs
//   const users = [];
//   for (let i = 0; i < 5; i++) {
//     users.push(generateFakeUser());
//   }
//   await User.bulkCreate(users);

//   // Ajouter des produits
//   const products = [];
//   for (let i = 0; i < 5; i++) {
//     products.push(generateFakeProduct());
//   }
//   await Product.bulkCreate(products);

//   console.log('Database seeded!');
// };

// seedDatabase().catch(error => {
//   console.error('Unable to seed database:', error);
// });