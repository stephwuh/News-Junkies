
const Sequelize = require("sequelize");
const connection = require('.././database.js');

const UserSource = connection.define('UserSource', {
    source: {
      type: Sequelize.STRING,
    }
}, {
    timestamps: false
})

module.exports = UserSource;