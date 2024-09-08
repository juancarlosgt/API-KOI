const { DataTypes } = require('sequelize');
const db = require('../db');

// Modelo Carrito
const Carrito = db.define('Carrito', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario', // Asegúrate de que coincida con el nombre del modelo de Usuario
      key: 'id',
    },
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'Carrito',
});

module.exports = Carrito;
