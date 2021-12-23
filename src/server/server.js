const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const app = express();
const connect = require(".././database/database.js");

const news = require(".././database/models/news.js");

const UserSource = require(".././database/models/userSource.js");

const sequelize = require(".././database/sequelizeConfig");

const NewsAPI = require("newsapi");

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

  let headLinesObj = {
    center: {},
    rightCenter: {},
    leftCenter: {},
    right: {},
    left: {},
  };

  let centerArr = [];
  let rightCenterArr = [];
  let leftCenterArr = [];
  let rightArr = [];
  let leftArr =[];



  //database inner join query to get user source and news info

  try {
    query = await UserSource.findAll({ include: news });
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
    let arr;

    switch (query[i].news.dataValues.rating) {
      case "left":
        headLinesObj.left[query[i].news.dataValues.name] = [];

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

        arr = [...response.articles]

        for(let y=0; y<arr.length; y++){

          arr[y].ratingNum = 1

        }


        headLinesObj.left[query[i].news.dataValues.name].push(
          arr
        );

       

        break;

      case "left-center":
        headLinesObj.leftCenter[query[i].news.dataValues.name] = [];

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

        arr = [...response.articles]

        for(let y=0; y<arr.length; y++){

          arr[y].ratingNum = 2

        }

        headLinesObj.leftCenter[query[i].news.dataValues.name].push(
          arr
        );

       

        break;
      case "center":
        headLinesObj.center[query[i].news.dataValues.name] = [];

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

        arr = [...response.articles]

        for(let y=0; y<arr.length; y++){

          arr[y].ratingNum = 3

        }

        headLinesObj.center[query[i].news.dataValues.name].push(
          arr
        );

       

        break;
      case "right-center":
        headLinesObj.rightCenter[query[i].news.dataValues.name] = [];

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

        arr = [...response.articles]

        for(let y=0; y<arr.length; y++){

          arr[y].ratingNum = 4

        }

        headLinesObj.rightCenter[query[i].news.dataValues.name].push(
          arr
        );

       


        break;

      case "right":
        headLinesObj.right[query[i].news.dataValues.name] = [];

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

        arr = [...response.articles]

        for(let y=0; y<arr.length; y++){

          arr[y].ratingNum = 5

        }

        headLinesObj.right[query[i].news.dataValues.name].push(
          arr
        );


    }
  }

 

  res.status(200).send(headLinesObj);
});

connect();

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
