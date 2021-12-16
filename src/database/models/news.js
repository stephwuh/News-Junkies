const {Sequelize, DataTypes} = require("sequelize");
const connection = require('.././sequelizeConfig.js');

const news = connection.define('news', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
    },
    searchTerm: {
      type: DataTypes.STRING,
      field: 'search_term',
      // allowNull: false
    },  
    url: {
      type: DataTypes.STRING,
      field: 'url',
      // allowNull: false
    },
    
    // createdAt: Sequelize.DATE,
    // updatedAt: Sequelize.DATE,
}, {
    tableName: 'news',
    timestamps: false
})

module.exports = news;