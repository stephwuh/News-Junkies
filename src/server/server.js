const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const bcrypt = require('bcrypt');
const app = express();
const connect = require("../database/database.js");

const News = require("../database/models/news.js");

const User = require("../database/models/user.js");

const sequelize = require("../database/sequelizeConfig");

const NewsAPI = require("newsapi");

const biasCalc = require("./biasCalc.js");

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
    const query = await News.findAll();

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
  try {
    const user = await User.findOne({
      where: { id: req.body.UserId },
    });

    // console.log(user.dataValues)
    // console.log(req.body.newsId)

    await user.setSources(req.body.newsId);

    // await UserNews.bulkCreate(userInfoArr, {returning: true});

    // await UserSou.bulkCreate(newsId, { returning: true });

    res.status(200).send("updated successfully");
  } catch (error) {
    res.status(500).send("database error");
  }
});

app.get("/api/my-news/:userId", async (req, res) => {


    let userId = req.params.userId;

    let query;

    let bias;
    let count;

    let centerArr = [];
    let rightCenterArr = [];
    let leftCenterArr = [];
    let rightArr = [];
    let leftArr = [];



    //  let  response = await newsapi.v2.everything({
    //     domains: "huffpost.com",
    //     language: "en",
    //     pageSize: 15,
    //   });

    //   console.log(response)

    //database inner join query to get user source and news info

    try {
      let user = await User.findOne({
        where: { id: userId },

        include: {model: News, as: "Sources"}

      });

      query = user.dataValues.Sources

      // console.log(query)

      bias = user.dataValues.userBias;
      count = user.dataValues.articleCount;

    } catch (error) {
      res.status(500).send("database error");
    }

    /*
    1) organizing query data according to bias rating and then name of source.
    2) I check to see if the source has a search term or a url and then make an API call to newsapi.org based on that information.
    3) I push the news articles into the appropriate object.
  */

    for (let i = 0; i < query.length; i++) {
      let response;

      switch (query[i].dataValues.rating) {
        case "left":
          //make repeating if else statement into module

          if (query[i].dataValues.searchTerm) {
            response = await newsapi.v2.everything({
              sources: query[i].dataValues.searchTerm,
              language: "en",
              pageSize: 15,
            });
          } else {
            response = await newsapi.v2.everything({
              domains: query[i].dataValues.url,
              language: "en",
              pageSize: 15,
            });
          }

          leftArr = [...response.articles];

          for (let y = 0; y < leftArr.length; y++) {
            leftArr[y].ratingNum = 1;
            leftArr[y].rating = 'left';
          }

          break;

        case "left-center":
          if (query[i].dataValues.searchTerm) {
            response = await newsapi.v2.everything({
              sources: query[i].dataValues.searchTerm,
              language: "en",
              pageSize: 15,
            });
          } else {
            response = await newsapi.v2.everything({
              domains: query[i].dataValues.url,
              language: "en",
              pageSize: 15,
            });
          }

          leftCenterArr = [...response.articles];

          for (let y = 0; y < leftCenterArr.length; y++) {
            leftCenterArr[y].ratingNum = 2;
            leftCenterArr[y].rating = 'left center';
          }

          break;
        case "center":
          if (query[i].dataValues.searchTerm) {
            response = await newsapi.v2.everything({
              sources: query[i].dataValues.searchTerm,
              language: "en",
              pageSize: 15,
            });
          } else {
            response = await newsapi.v2.everything({
              domains: query[i].dataValues.url,
              language: "en",
              pageSize: 15,
            });
          }

          centerArr = [...response.articles];

          for (let y = 0; y < centerArr.length; y++) {
            centerArr[y].ratingNum = 3;
            centerArr[y].rating = 'center';
          }

          break;
        case "right-center":
          if (query[i].dataValues.searchTerm) {
            response = await newsapi.v2.everythings({
              sources: query[i].dataValues.searchTerm,
              language: "en",
              pageSize: 15,
            });
          } else {
            response = await newsapi.v2.everything({
              domains: query[i].dataValues.url,
              language: "en",
              pageSize: 15,
            });
          }

          rightCenterArr = [...response.articles];

          for (let y = 0; y < rightCenterArr.length; y++) {
            rightCenterArr[y].ratingNum = 4;
            rightCenterArr[y].rating = 'right center';
          }

          break;

        case "right":
          if (query[i].dataValues.searchTerm) {
            response = await newsapi.v2.everything({
              sources: query[i].dataValues.searchTerm,
              language: "en",
              pageSize: 15,
            });
          } else {
            response = await newsapi.v2.everything({
              domains: query[i].dataValues.url,
              language: "en",
              pageSize: 15,
            });
          }

          rightArr = [...response.articles];

          for (let y = 0; y < rightArr.length; y++) {
            rightArr[y].ratingNum = 5;
            rightArr[y].rating = 'right';
          }
      }
    }

    console.log(leftArr)

    // let centerArr = [];
    // let rightCenterArr = [];
    // let leftCenterArr = [];
    // let rightArr = [];
    // let leftArr = [];

    // console.log(leftArr)

    let responseArr1 = [];

    // This is the state when user bias is balanced.

    for (let i = 0; i < centerArr.length; i++) {
      responseArr1.push(
        centerArr[i],           //3
        rightCenterArr[i],      //4
        leftCenterArr[i],       //2
        rightArr[i],            //5
        leftArr[i]              //1
      );
    }

      //need to filter out articles that are null because sometimes
      //news API returns less articles than the number you request
    let responseArr2 = responseArr1.filter(article => article !== undefined)

    if (bias === 3) {

      // console.log(responseArr2)

      res.status(200).send(responseArr2);

    } else {

      let tempArr = [];

      let array = biasCalc.sourcesNeeded(bias, count);

      console.log(array)

      array.forEach((num) => {
        let index = responseArr2.findIndex(element => element.ratingNum === num);

        let article = responseArr2.splice(index, 1)

        tempArr.push(article[0])

      });

      console.log(tempArr)

      let centerArr = [];
      let rightCenterArr = [];
      let leftCenterArr = [];
      let rightArr = [];
      let leftArr = [];

      //looping over mutated responseArr1 (excluding user recommended articles based on bias number).

      responseArr2.forEach(article => {

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

      // console.log(tempArr)

      let responseArr3 = tempArr.filter(article => article !== undefined)

      res.status(200).send(responseArr3);

    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // console.log(req.body);

    try {

      //find duplicate email

      let userData = await User.findAll({
        where: {
          email: email,
        },
      });

      // console.log(userData)

      if (userData[0]) return res.status(401).send('Account already exists with this email');

      // add logic to salt and hash password (bcrypt)

      const salt = bcrypt.genSaltSync(5);
      const passwordHash = bcrypt.hashSync(password, salt);


      let createdUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: passwordHash,
      });

      // console.log(createdUser)

      let responseObj = { userId: createdUser.dataValues.id };

      res.status(200).send(responseObj);
    } catch (error) {
      res.status(401).send("Could not sign up");
    }

  // let arr = [
  //   {
  //     source: { id: null, name: "Vox" },
  //     author: "Tasha Eichenseher",
  //     title: "Why more psychiatrists think mindfulness can help treat ADHD",
  //     description:
  //       "A 1-minute mindfulness practice helped settle my ADHD-addled mind.",
  //     url: "https://www.vox.com/22847150/adhd-treatment-mindfulness-adderall",
  //     urlToImage:
  //       "https://cdn.vox-cdn.com/thumbor/cEXWhXfN0iLcjvg3xX6sQ3JYM-4=/0x36:1800x978/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23123176/mindfulness_adhd_board_2.jpg",
  //     publishedAt: "2021-12-27T12:35:00Z",
  //     content:
  //       "Christina Animashaun/Vox\r\n" +
  //       "\n" +
  //       " \n" +
  //       "\n" +
  //       "\n" +
  //       " A 1-minute mindfulness practice helped settle my ADHD-addled mind. \n" +
  //       "One morning this summer, I sat at my desk feeling restlessness boil inside me. I’d recently moved f… [+11468 chars]",
  //     ratingNum: 1,
  //     rating: "left",
  //   },
  //   {
  //     source: {
  //       id: "the-wall-street-journal",
  //       name: "The Wall Street Journal",
  //     },
  //     author: "Donna Abdulaziz",
  //     title: "With Rappers, Race Cars and Raves, Saudi Learns How to Party...",
  //     description:
  //       "With Rappers, Race Cars and Raves, Saudi Learns How to Party...\r\n" +
  //       "\n" +
  //       " \n" +
  //       " \n" +
  //       " \n" +
  //       " (Third column, 11th story, link)\r\n" +
  //       "\n" +
  //       " \r\n" +
  //       "\n" +
  //       " \r\n" +
  //       "\n" +
  //       " \n" +
  //       " Related stories:Kingdom Seeks to Become Cultural Hub...\r\n" +
  //       "\n" +
  //       " \r\n" +
  //       "\n" +
  //       " \n" +
  //       " \n" +
  //       " Drudge Report Feed needs your support!   Become a Patron",
  //     url: "https://www.wsj.com/articles/with-rappers-race-cars-and-raves-saudi-arabia-learns-how-to-party-11640610116",
  //     urlToImage: "https://images.wsj.net/im-458298/social",
  //     publishedAt: "2021-12-27T13:19:39Z",
  //     content:
  //       "RIYADH, Saudi ArabiaThis conservative Islamic kingdom is rapidly trying to ease its staid social norms, allowing women to drive and travel freely in recent years, opening doors to tourists and tolera… [+7332 chars]",
  //     ratingNum: 3,
  //     rating: "center",
  //   },
  //   {
  //     source: { id: null, name: "The Center Square" },
  //     author: "Bruce Walker | The Center Square",
  //     title:
  //       "Michigan's Whitmer signs off on $409 million small-business relief program - Iosco County News Herald",
  //     description:
  //       "(The Center Square) – The third time was a charm for a small-business relief provision of Senate Bill 85, which was signed Monday by Michigan Gov. Gretchen Whitmer.",
  //     url: "https://www.thecentersquare.com/michigan/michigans-whitmer-signs-off-on-409-million-small-business-relief-program/article_bc0f4f66-61d4-11ec-bdb5-7b1d3ba90a35.html",
  //     urlToImage:
  //       "https://bloximages.chicago2.vip.townnews.com/iosconews.com/content/tncms/assets/v3/editorial/1/51/151e4718-3cf1-5bdf-a761-e37911dad5d3/604697df8250a.image.jpg?crop=1662%2C873%2C0%2C187&resize=1200%2C630&order=crop%2Cresize",
  //     publishedAt: "2021-12-20T21:44:00Z",
  //     content:
  //       "(The Center Square) The third time was a charm for a small-business relief provision of Senate Bill 85, which was signed Monday by Michigan Gov. Gretchen Whitmer.\r\n" +
  //       "A House version of the bill, House … [+1760 chars]",
  //     ratingNum: 4,
  //     rating: "right center",
  //   },
  //   {
  //     source: { id: "the-washington-post", name: "The Washington Post" },
  //     author: "Ruby Mellen, Siobhán O'Grady, Ezzatullah Mehrdad, Júlia Ledur",
  //     title: "Unsettled: Searching for home after escaping the Taliban",
  //     description:
  //       "From Uganda to Mexico, Afghans who escaped the Taliban are spread across more than three dozen countries, searching for stability and a new place to call home.",
  //     url: "https://www.washingtonpost.com/world/interactive/2021/afghan-taliban-escape-resettlement/",
  //     urlToImage:
  //       "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RZNFQYSZZEI6ZA4WKVJL55K4HQ.jpg&w=1200",
  //     publishedAt: "2021-12-27T14:00:28Z",
  //     content:
  //       "Her departure from Kabul reminded her of some zombie movie, the young woman said. It was an experience she could describe only as dehumanizing, terrifying and very traumatizing.\r\n" +
  //       "When she woke up in … [+11555 chars]",
  //     ratingNum: 2,
  //     rating: "left center",
  //   },
  //   {
  //     source: { id: null, name: "The Federalist" },
  //     author: "Christopher Bedford",
  //     title: "How Advent Teaches Us, Amid Sorrow, To Rejoice",
  //     description:
  //       "Today is the last day of Advent. What does the church teach us about sadness and joy? Just consider some of her hymns and scriptures.",
  //     url: "https://thefederalist.com/2021/12/24/how-advent-teaches-us-amid-sorrow-to-rejoice/",
  //     urlToImage:
  //       "https://thefederalist.com/wp-content/uploads/2021/12/Gerard_van_Honthorst_-_Adoration_of_the_Shepherds_1622-e1640293118745.jpg",
  //     publishedAt: "2021-12-24T11:46:57Z",
  //     content:
  //       "“Why are these Christmas songs so sad?”\r\n" +
  //       "The question came from a little girl named Hazel. She’d been raised in a different Christian tradition, with drums, guitars, and applause. But that Sunday of … [+4184 chars]",
  //     ratingNum: 5,
  //     rating: "right",
  //   },
  // ];

  // res.status(200).send(arr);
});

app.post("/api/myNews/updateUserBiasRating", async (req, res) => {
  const { userId, ratingNum, checked } = req.body;

    // console.log(req.body);

  let userBias
  let articleCount
  let newBiasDataObj

    try {

      //get user bias number and article count

     let user = await User.findOne({
        where: { id: userId },

        attributes: ["userBias", "articleCount"],
      });

      // console.log(user.dataValues)

      userBias = user.dataValues.userBias
      articleCount = user.dataValues.articleCount

    } catch (error) {
      res.status(500).send("database error");
    }

    

    if(checked){

      newBiasDataObj = biasCalc.addArticleBias(userBias, ratingNum, articleCount)

    }else{
      newBiasDataObj = biasCalc.undoArticleBias(userBias, ratingNum, articleCount)
    }

    try {
      
      await User.update({

        userBias: newBiasDataObj.newUserBias,
        articleCount: newBiasDataObj.newArticleCount

      },
      {
        where: { id: userId }
      }
      )

      res.status(200).send("user bias updated successfully");

    } catch (error) {
      res.status(500).send("database error");
    }

});

app.post('/api/auth/signin', async (req, res) => {

  const {email, password} = req.body

  console.log(req.body)

  try {

    let user = await User.findOne({
      where: { email: email },
    });

    if(!user) {
      return res.status(401).send('User not found')
    }

    const passwordHash = user.dataValues.password;

    const PWAccuracy = bcrypt.compareSync(password, passwordHash);

    console.log(user.dataValues.id)

    PWAccuracy
        ? res.send({userId: user.dataValues.id})
        : res.status(401).send('Incorrect password');
    
  } catch (error) {
      res.status(500).send('Database error')
  }  


})

connect();

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
