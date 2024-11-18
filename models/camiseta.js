
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const SubColeccion = require('./SubColeccion');

const Camiseta = sequelize.define('Camiseta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  lanzamiento: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  oferta: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  subColeccionId: {
    type: DataTypes.INTEGER,
    references: {
      model: SubColeccion,
      key: 'id',
    }
}
});

module.exports = Camiseta;