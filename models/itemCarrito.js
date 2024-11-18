const { DataTypes } = require('sequelize');
const db = require('../db');
const TipoCamisa = require('./tipoCamisa');

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
      model: 'Camiseta', 
      key: 'id',
    },
  },
  nombre:{
    type:DataTypes.STRING,
    allowNull:false
  },
  tipoCamisaId: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoCamisa,
      key: 'id',
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  talla: {
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  tableName: 'ItemCarrito',
});

module.exports = ItemCarrito;
