const Sequelize = require("sequelize");
const connection = require('.././sequelizeConfig.js')

const User = connection.define('User', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,  
      allowNull: false
        
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,  
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userBias: {
        type: Sequelize.FLOAT,
        defaultValue: '3',
        allowNull: false 
        
    },
    articleCount:{
        type: Sequelize.INTEGER,
        defaultValue: '0',
        allowNull: false 
    }
    
}, {
    timestamps: false
})

module.exports = User;
