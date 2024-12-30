// filepath: /C:/Users/darre/Bureau/Computer Science/flutter/Projects/ecommerce/backend/models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Product = sequelize.define('Product', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image:{
    type: DataTypes.STRING,
    allowNull: true
  }

});

module.exports = Product;