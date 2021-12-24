const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const app = express();
const connect = require("../database/database.js");

const news = require("../database/models/news.js");

const UserSource = require("../database/models/userSource.js");
const User = require("../database/models/user.js");

const sequelize = require("../database/sequelizeConfig");

const NewsAPI = require("newsapi");

const UserBiasCalc = require("./UserBiasCalc.js");

const newsapi = new NewsAPI("ff88b865f6204634b0276875d1dac794");

app.use(cors());
app.use(express.json());

app.get("/api/getSearch/", async (_req, res) => {
  const searchTerm = "booster shots";

  try {
    // const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${process.env.NEWSAPI_KEY}`);
    // res.send(response.data);
  } catch (error) {
    res.status(502).send("Issue with third party api");
  }
});

app.get("/api/getSources", async (_req, res) => {
  try {
    const query = await news.findAll();

    let left = [];
    let leftCenter = [];
    let center = [];
    let rightCenter = [];
    let right = [];

    for (let i = 0; i < query.length; i++) {
      if (query[i].dataValues.rating === "left") {
        left.push(query[i].dataValues);
      } else if (query[i].dataValues.rating === "left-center") {
        leftCenter.push(query[i].dataValues);
      } else if (query[i].dataValues.rating === "center") {
        center.push(query[i].dataValues);
      } else if (query[i].dataValues.rating === "right-center") {
        rightCenter.push(query[i].dataValues);
      } else if (query[i].dataValues.rating === "right") {
        right.push(query[i].dataValues);
      }
    }

    res.status(200).send({ left, leftCenter, center, rightCenter, right });
  } catch (error) {
    res.status(500).send("database error");
  }
});

app.post("/api/postUserSource", async (req, res) => {
  const newsId = req.body;

  console.log(req.body);

  try {
    await UserSource.bulkCreate(newsId, { returning: true });

    res.status(200).send("updated successfully");
  } catch (error) {
    res.status(500).send("database error");
  }
});

app.get("/api/my-news", async (req, res) => {

  // let response = await newsapi.v2.everything({
  //               q: 'business',
  //               sources: 'cnn',
  //               // domains: query[i].news.dataValues.url,
  //               language: "en",
  //               pageSize: 15,
  //             });

  // console.log(response.articles)


  let query;

  let bias;
  let count;


  let centerArr = [];
  let rightCenterArr = [];
  let leftCenterArr = [];
  let rightArr = [];
  let leftArr =[];

  let arr

  //database inner join query to get user source and news info

  try {
    query = await UserSource.findAll({ include: news });
    await User.create({
      userBias: 3,
      articleCount: 0,
    })
    let response = await User.findOne({
      where: {id: 1},
      attributes: ['userBias', 'articleCount']
    });
    
    bias = response.dataValues.userBias
    count = response.dataValues.articleCount

  } catch (error) {
    res.status(500).send("database error");
  }


console.log(UserBiasCalc.userBiasCalc(4, 100))
// console.log(UserBiasCalc.userBiasCalc(1, 2))    



// [2,2,2,5, 4 ]
// 12 - 6 = 6   
// 15 - 

/* 
  1) organizing query data according to bias rating and then name of source.
  2) I check to see if the source has a search term of a url and then make an API call to newsapi.org based on that information.
  3) I push the news articles into the appropriate object.
*/

  // for (let i = 0; i < query.length; i++) {
  //   let response;

  //   switch (query[i].news.dataValues.rating) {
  //     case "left":

  //       //make repeating if else statement into module

  //       if (query[i].news.dataValues.searchTerm) {
  //         response = await newsapi.v2.topHeadlines({
  //           sources: query[i].news.dataValues.searchTerm,
  //           language: "en",
  //           pageSize: 15,
  //         });

  //       } else {
  //         response = await newsapi.v2.everything({
  //           domains: query[i].news.dataValues.url,
  //           language: "en",
  //           pageSize: 15,
  //         });
  //       }

  //       leftArr = [...response.articles]

  //       for(let y=0; y<leftArr.length; y++){

  //         leftArr[y].ratingNum = 1

  //       }
       

  //       break;

  //     case "left-center":
       

  //       if (query[i].news.dataValues.searchTerm) {
  //         response = await newsapi.v2.topHeadlines({
  //           sources: query[i].news.dataValues.searchTerm,
  //           language: "en",
  //           pageSize: 15,
  //         });
  //       } else {
  //         response = await newsapi.v2.everything({
  //           domains: query[i].news.dataValues.url,
  //           language: "en",
  //           pageSize: 15,
  //         });
  //       }

  //       leftCenterArr = [...response.articles]

  //       for(let y=0; y<leftCenterArr.length; y++){

  //         leftCenterArr[y].ratingNum = 2

  //       }
     

  //       break;
  //     case "center":
       

  //       if (query[i].news.dataValues.searchTerm) {
  //         response = await newsapi.v2.topHeadlines({
  //           sources: query[i].news.dataValues.searchTerm,
  //           language: "en",
  //           pageSize: 15,
  //         });
  //       } else {
  //         response = await newsapi.v2.everything({
  //           domains: query[i].news.dataValues.url,
  //           language: "en",
  //           pageSize: 15,
  //         });
  //       }

  //       centerArr = [...response.articles]

  //       for(let y=0; y<centerArr.length; y++){

  //         centerArr[y].ratingNum = 3

  //       }


  //       break;
  //     case "right-center":
       

  //       if (query[i].news.dataValues.searchTerm) {
  //         response = await newsapi.v2.topHeadlines({
  //           sources: query[i].news.dataValues.searchTerm,
  //           language: "en",
  //           pageSize: 15,
  //         });
  //       } else {
  //         response = await newsapi.v2.everything({
  //           domains: query[i].news.dataValues.url,
  //           language: "en",
  //           pageSize: 15,
  //         });
  //       }

  //       rightCenterArr = [...response.articles]

  //       for(let y=0; y<rightCenterArr.length; y++){

  //         rightCenterArr[y].ratingNum = 4

  //       }

      


  //       break;

  //     case "right":
        

  //       if (query[i].news.dataValues.searchTerm) {
  //         response = await newsapi.v2.topHeadlines({
  //           sources: query[i].news.dataValues.searchTerm,
  //           language: "en",
  //           pageSize: 15,
  //         });
  //       } else {
  //         response = await newsapi.v2.everything({
  //           domains: query[i].news.dataValues.url,
  //           language: "en",
  //           pageSize: 15,
  //         });
  //       }

  //       rightArr = [...response.articles]

  //       for(let y=0; y<rightArr.length; y++){

  //         rightArr[y].ratingNum = 5

  //       }

      


  //   }
  // }

  // let responseArr = []

  // if(bias === 3){
  //   for (let i=0; i<centerArr.length; i++){

  //     responseArr.push(centerArr[i], rightCenterArr[i], leftCenterArr[i], rightArr[i], leftArr[i])
  
  //   }
  // } else{

  //   userBiasCalc.userBiasCalc(bias, count)

  // }

  

  // res.status(200).send(responseArr);
});

connect();

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
