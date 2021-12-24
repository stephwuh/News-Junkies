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

const sourcesNeeded = require("./sourcesNeeded.js");

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
  let leftArr = [];


  //database inner join query to get user source and news info

  try {
    query = await UserSource.findAll({ include: news });
    await User.create({
      userBias: 5,
      articleCount: 10,
    });
    let response = await User.findOne({
      where: { id: 1 },
      attributes: ["userBias", "articleCount"],
    });

    bias = response.dataValues.userBias;
    count = response.dataValues.articleCount;
  } catch (error) {
    res.status(500).send("database error");
  }

  /* 
  1) organizing query data according to bias rating and then name of source.
  2) I check to see if the source has a search term of a url and then make an API call to newsapi.org based on that information.
  3) I push the news articles into the appropriate object.
*/

  for (let i = 0; i < query.length; i++) {
    let response;

    switch (query[i].news.dataValues.rating) {
      case "left":
        //make repeating if else statement into module

        if (query[i].news.dataValues.searchTerm) {
          response = await newsapi.v2.everything({
            sources: query[i].news.dataValues.searchTerm,
            language: "en",
            pageSize: 15,
          });
        } else {
          response = await newsapi.v2.everything({
            domains: query[i].news.dataValues.url,
            language: "en",
            pageSize: 15,
          });
        }

        leftArr = [...response.articles];

        for (let y = 0; y < leftArr.length; y++) {
          leftArr[y].ratingNum = 1;
        }

        break;

      case "left-center":
        if (query[i].news.dataValues.searchTerm) {
          response = await newsapi.v2.everything({
            sources: query[i].news.dataValues.searchTerm,
            language: "en",
            pageSize: 15,
          });
        } else {
          response = await newsapi.v2.everything({
            domains: query[i].news.dataValues.url,
            language: "en",
            pageSize: 15,
          });
        }

        leftCenterArr = [...response.articles];

        for (let y = 0; y < leftCenterArr.length; y++) {
          leftCenterArr[y].ratingNum = 2;
        }

        break;
      case "center":
        if (query[i].news.dataValues.searchTerm) {
          response = await newsapi.v2.everything({
            sources: query[i].news.dataValues.searchTerm,
            language: "en",
            pageSize: 15,
          });
        } else {
          response = await newsapi.v2.everything({
            domains: query[i].news.dataValues.url,
            language: "en",
            pageSize: 15,
          });
        }

        centerArr = [...response.articles];

        for (let y = 0; y < centerArr.length; y++) {
          centerArr[y].ratingNum = 3;
        }

        break;
      case "right-center":
        if (query[i].news.dataValues.searchTerm) {
          response = await newsapi.v2.everythings({
            sources: query[i].news.dataValues.searchTerm,
            language: "en",
            pageSize: 15,
          });
        } else {
          response = await newsapi.v2.everything({
            domains: query[i].news.dataValues.url,
            language: "en",
            pageSize: 15,
          });
        }

        rightCenterArr = [...response.articles];

        for (let y = 0; y < rightCenterArr.length; y++) {
          rightCenterArr[y].ratingNum = 4;
        }

        break;

      case "right":
        if (query[i].news.dataValues.searchTerm) {
          response = await newsapi.v2.everything({
            sources: query[i].news.dataValues.searchTerm,
            language: "en",
            pageSize: 15,
          });
        } else {
          response = await newsapi.v2.everything({
            domains: query[i].news.dataValues.url,
            language: "en",
            pageSize: 15,
          });
        }

        rightArr = [...response.articles];

        for (let y = 0; y < rightArr.length; y++) {
          rightArr[y].ratingNum = 5;
        }
    }
  }

  // let centerArr = [];
  // let rightCenterArr = [];
  // let leftCenterArr = [];
  // let rightArr = [];
  // let leftArr = [];

  // console.log(leftArr)


  let responseArr1 = [];

  for (let i = 0; i < centerArr.length; i++) {
    responseArr1.push(
      centerArr[i],           //3
      rightCenterArr[i],      //4
      leftCenterArr[i],       //2
      rightArr[i],            //5
      leftArr[i]              //1
    );
  }


  if (bias === 3) { 

    res.status(200).send(responseArr1);

  } else {

    let tempArr = [];

    let array = sourcesNeeded.sourcesNeeded(bias, count);

    console.log(array)

    // let recommendedArticles = []

    array.forEach((num) => {
      let index = responseArr1.findIndex(element => element.ratingNum === num);

      // recommendedArticles.push(responseArr.splice(index, 1)) 

      let article = responseArr1.splice(index, 1)

      tempArr.push(article[0])

    });


    let centerArr = [];
    let rightCenterArr = [];
    let leftCenterArr = [];
    let rightArr = [];
    let leftArr = [];


    responseArr1.forEach(article => {

      switch (article.ratingNum) {
        case 1:
        leftArr.push(article)
        break;

        case 2:
        leftCenterArr.push(article)
        break;

        case 3:
          centerArr.push(article)
          break;
        case 4:
          rightCenterArr.push(article)
          break;
        case 5:
          rightArr.push(article)
        break;
      }
    })

    for (let i = 0; i < centerArr.length; i++) {
      tempArr.push(
        centerArr[i],           //3
        rightCenterArr[i],      //4
        leftCenterArr[i],       //2
        rightArr[i],            //5
        leftArr[i]              //1
      );
    }

    console.log(tempArr)

    let responseArr2 = tempArr.filter(article => article !== undefined)

    res.status(200).send(responseArr2);

  }
});

connect();

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
