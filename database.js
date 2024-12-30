// filepath: /path/to/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // ou 'postgres', 'sqlite', 'mssql'
});

module.exports = sequelize;