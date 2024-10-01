const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const TipoCamisa = sequelize.define('TipoCamisa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},{
  tableName : "TipoCamisa"
});

module.exports = TipoCamisa;