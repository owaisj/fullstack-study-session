const { DataTypes } = require('sequelize');
const sequelize = require('./db')
const Image = sequelize.define('Image', {
  data: {
    type: DataTypes.TEXT,
    allowNull: false //blob maybe
  }
});

module.exports = Image;
