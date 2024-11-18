// imagen.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Camiseta = require('./camiseta');

const Imagen = sequelize.define('Imagen', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  camisetaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Camiseta,
      key: 'id',
    },
    onDelete: 'CASCADE' // Opcional: elimina las imágenes si se elimina la camiseta
  }
});

module.exports = Imagen;
