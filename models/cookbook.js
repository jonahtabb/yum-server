const { DataTypes } = require('sequelize');
const db = require('../db');

const CookBook = db.define('cookbook', {
  cuisine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingridients: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
  },
});

module.exports = CookBook;
