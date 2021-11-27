const Sequelize = require("sequelize");
const connection = require('.././sequelizeConfig.js');

const news = connection.define('news', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        // allowNull: false
      },
    source: {
      type: Sequelize.STRING,
      field: 'source',
      // allowNull: false
    },
    rating: {
      type: Sequelize.STRING,
      field: 'rating',  
      // allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        field: 'number',  
        // allowNull: false
      },
    type: {
      type: Sequelize.STRING,
      field: 'type',
      // allowNull: false
    }
}, {
    tableName: 'news'
})

module.exports = news;