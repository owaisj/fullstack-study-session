const { DataTypes } = require('sequelize');
const sequelize = require('./db')

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
  },
});

module.exports = Post;
