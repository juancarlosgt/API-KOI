const { DataTypes } = require('sequelize');
const db = require('../db');

// Modelo ItemCarrito
const ItemCarrito = db.define('ItemCarrito', {
  carritoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Carrito',
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Camiseta', // Supongamos que 'Camiseta' es tu modelo de productos
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull:false,
  },
}, {
  tableName: 'ItemCarrito',
});

module.exports = ItemCarrito;
