// filepath: /C:/Users/darre/Bureau/Computer Science/flutter/Projects/ecommerce/backend/models/Orders.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Orders = sequelize.define('Orders', {
  status: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'), // Vous pouvez adapter ces valeurs
    allowNull: false,
    defaultValue: 'Pending', // Valeur par défaut
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },



});

module.exports = Orders;