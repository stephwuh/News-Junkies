const Sequelize = require('sequelize');

const connection = require('./sequelizeConfig.js');

const News = require('./models/news.js');
const UserSource = require('./models/userSource.js');
const User = require('./models/user.js');
// const UserNews = require('./models/userNews.js');


// UserSource.belongsTo(News); 

// User.hasMany(UserNews)
// News.hasMany(UserNews)

User.belongsToMany(News, {as: "Sources", through: 'UserNews'})
News.belongsToMany(User, {as: "Users", through: 'UserNews'})
// Clothing.belongsToMany(Outfit, { as: 'Clothes', through: 'ClothingOutfit', foreignKey: 'ClothingId'})
// Outfit.belongsToMany(Clothing, { as: 'Outfits', through: 'ClothingOutfit', foreignKey: 'OutfitId'})


//sync method turns our models into tables in sql database
module.exports = connect = ()=>{
    connection
    .sync({
        // force: true drops the table first then recreates it
        // force: true,
      /* 
      alter: true 
      This checks what is the current state of the table in the database 
      (which columns it has, what are their data types, etc), 
      and then performs the necessary changes in the table to make it match the model. 
      */
      alter: true,
      logging: console.log
    })
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  }