const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Coleccion = require('./coleccion');

const SubColeccion = sequelize.define('SubColeccion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coleccionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Coleccion,
      key: 'id',
    },
  }
},{
  tableName : "SubColeccion"
});

module.exports = SubColeccion;