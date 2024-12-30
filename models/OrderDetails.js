// filepath: /C:/Users/darre/Bureau/Computer Science/flutter/Projects/ecommerce/backend/models/OrderDetails.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const OrderDetails = sequelize.define('OrderDetails', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

});

module.exports = OrderDetails;