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
  wins: {
    type: Sequelize.INTEGER,
  },
  losses: {
    type: Sequelize.INTEGER,
  },
}, { timestamps: false });

module.exports = User;
