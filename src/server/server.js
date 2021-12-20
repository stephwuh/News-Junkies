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


  let query;
  let search = { sources: [], domains: [] };
  let headLinesObj = {}

  try {
    query = await UserSource.findAll({ include: news });
  } catch (error) {
    res.status(500).send("database error");
  }

//  console.log(query[0].news.dataValues.name)

  for (let i = 0; i < query.length; i++) {

    headLinesObj[query[i].news.dataValues.name] = [];

    if (query[i].news.dataValues.searchTerm) {
      // searchTerm[0].searchTerm.push(query[i].news.dataValues.searchTerm)

      search.sources.push(query[i].news.dataValues.searchTerm);
    } else {
      // searchTerm[1].url.push(query[i].news.dataValues.url)

      search.domains.push(query[i].news.dataValues.url);
    }
  }

  console.log(search);
  console.log(headLinesObj)

  // let response = await newsapi.v2.everything({
  //           // sources: 'cnn',
  //           // q: 'cspan',
  //           domains: '	dailywire.com',
  //           // category: 'business',
  //           language: "en",
  //           // country: 'us',
  //           pageSize: 15,
  //         });

  // console.log(response.articles[0].source)

  try {

    for (let searchTerm in search) {
      for (let i = 0; i < search[searchTerm].length; i++) {
  
        let response;
  
        if (searchTerm === "sources") {
          response = await newsapi.v2.everything({
            sources: search[searchTerm][i],
            // q: 'cspan',
            // domains: domains,
            // category: 'business',
            language: "en",
            // country: 'us',
            pageSize: 15,
          });
        } else {
  
          response = await newsapi.v2.everything({
            // sources: sources,
            // q: 'cspan',
            domains: search[searchTerm][i],
            // category: 'business',
            language: "en",
            // country: 'us',
            pageSize: 15,
          });
  
        }
  
        headLinesObj[response.articles[0].source.name] = response.articles
  
      }
    }
    
  } catch (error) {
      res.status(503).send("something wrong with 3rd party api")
  }

  res.status(200).send(headLinesObj)

 
});

connect();

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
