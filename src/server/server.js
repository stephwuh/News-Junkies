const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const app = express();
const connect = require('.././database/database.js')

const news = require('.././database/models/news.js');

const UserSource = require('.././database/models/userSource.js');

const sequelize = require('.././database/sequelizeConfig')

const NewsAPI = require('newsapi');

const newsapi = new NewsAPI('ff88b865f6204634b0276875d1dac794');


app.use(cors());
app.use(express.json())

app.get('/api/getSearch/', async (_req, res)=>{

    const searchTerm = 'booster shots'

    try {
        // const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${process.env.NEWSAPI_KEY}`);

        // res.send(response.data);

    } catch (error) {
        res.status(502).send('Issue with third party api');
    }

})

app.get('/api/getSources', async(_req, res) => {

    try {
        const query = await news.findAll(); 

        // console.log(query);
        
        let left=[];
        let leftCenter=[];
        let center=[];
        let rightCenter=[];
        let right=[];

        for(let i=0; i<query.length; i++){

            if(query[i].dataValues.rating === "left"){
                left.push(query[i].dataValues);
            } else if(query[i].dataValues.rating === "left-center"){
                leftCenter.push(query[i].dataValues);
            } else if(query[i].dataValues.rating === "center"){
                center.push(query[i].dataValues);
            } else if(query[i].dataValues.rating === "right-center"){
                rightCenter.push(query[i].dataValues);
            } else if(query[i].dataValues.rating === "right"){
                right.push(query[i].dataValues);
            }
            
        }


        res.status(200).send({left, leftCenter, center, rightCenter, right } );

    } catch (error) {
        res.status(500).send('database error');
    }
    
})

app.post('/api/postUserSource', async (req, res)=>{

    const newsId = req.body;

    try {

        await UserSource.bulkCreate(newsId, {returning: true});

        
    } catch (error) {
        
    }

})

app.get('/api/getHeadlines', async (req, res)=>{

    try {

        let userSource = [];

        const query = await UserSource.findAll({include: news});

        for (let i=0; i < query.length; i++){
            userSource.push(query[i].news.dataValues.source)
        }

        console.log(userSource)

        const string = userSource.join(',')

        console.log(string)

        // const headLines = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=ff88b865f6204634b0276875d1dac794`)

        const headLines = newsapi.v2.topHeadlines({
            sources: 'time',
            // q: 'bitcoin',
            // category: 'business',
            language: 'en',
            // country: 'us'
          })

        //   const headLines = await newsapi.v2.everything({
        //     // sources: 'ABC-News',
        //     // q: 'cspan',
        //     domains: 'www.ap.org',
        //     // category: 'business',
        //     language: 'en',
        //     // country: 'us'
        //   })

        // const headLines = await newsapi.v2.sources({
        //     // category: 'technology',
        //     name:"New York Times",
        //     language: 'en',
        //     // country: 'us'
        //   })

        console.log(headLines)


    } catch (error) {
        
    }

    // const country = 'us'

    // try {

    //     const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWSAPI_KEY}`);

    //     res.send(response.data);


    // } catch (error) {
    //     res.status(502).send('Issue with third party api');
    // }
})


connect();

const port = process.env.PORT || 5050;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})