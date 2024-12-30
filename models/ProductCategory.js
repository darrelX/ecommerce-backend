// filepath: /C:/Users/darre/Bureau/Computer Science/flutter/Projects/ecommerce/backend/models/ProductCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const ProductCategory = sequelize.define('ProductCategory', {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },


});

module.exports = ProductCategory;