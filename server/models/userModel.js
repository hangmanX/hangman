const Sequelize = require('sequelize');
const sequelize = require('./sequelizeModel');

const User = sequelize.define('user', {
  login: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  avatar_url: {
    type: Sequelize.STRING,
  },
  access_token: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
