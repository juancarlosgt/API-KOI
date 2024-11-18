const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Talla = sequelize.define('Talla', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING
    }
  },{
    tableName : "Talla"
  });
  
  module.exports = Talla;