const Sequelize = require("sequelize");
require('dotenv').config();

const connection = new Sequelize('newsJunkies', 'postgres', process.env.POSTGRESQL_PW, {
    host: 'localhost',
    dialect: 'postgres'
  });

module.exports = connection;