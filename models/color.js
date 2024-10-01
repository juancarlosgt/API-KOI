const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Color = sequelize.define('Color', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    hex: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    }
  },{
    tableName : "Color"
  });
  
  module.exports = Color;