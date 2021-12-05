const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const app = express();
const connect = require('.././database/database.js')

const news = require('.././database/models/news.js');

const UserSource = require('.././database/models/userSource.js');


app.use(cors());
app.use(express.json())

app.get('/api/getSearch/', async (_req, res)=>{

    const searchTerm = 'booster shots'

    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${process.env.NEWSAPI_KEY}`);

        res.send(response.data);

    } catch (error) {
        res.status(502).send('Issue with third party api');
    }

})

app.get('/api/getHeadlines', async (req, res)=>{

    const country = 'us'

    try {

        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWSAPI_KEY}`);

        res.send(response.data);


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

    console.log(newsId)

    try {

        await UserSource.bulkCreate(newsId, {returning: true});

        
    } catch (error) {
        
    }

})

connect();

const port = process.env.PORT || 5050;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})