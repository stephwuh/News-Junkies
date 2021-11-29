const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const app = express();
const connect = require('.././database/database.js')

const news = require('.././database/models/news.js');


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

app.get('/api/getBias', async(req, res) => {

    let source = await news.findOne({where: {source: 'AARP'}});

    console.log(source)

      res.status(200).send('upload successful');
})

connect();

const port = process.env.PORT || 5050;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})