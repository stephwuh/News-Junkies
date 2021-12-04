
const Sequelize = require("sequelize");
const connection = require('.././sequelizeConfig.js');

const UserSource = connection.define('UserSource', {
    // source: {
    //   type: Sequelize.STRING,
    // }
}, {
    timestamps: false
})

module.exports = UserSource;