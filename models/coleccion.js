const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Coleccion = sequelize.define('Coleccion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING
    }
  },{
    tableName : "Coleccion"
  });
  
  module.exports = Coleccion;