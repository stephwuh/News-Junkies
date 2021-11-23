const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const app = express();



app.use(cors());

app.get('/api/getNews/', async (_req, res)=>{

    const searchTerm = 'bitcoin'

    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${process.env.NEWSAPI_KEY}`);

        console.log(response.data)

    } catch (error) {
        res.status(424).send('Issue with third party api');
    }

})

const port = process.env.PORT || 5050;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})