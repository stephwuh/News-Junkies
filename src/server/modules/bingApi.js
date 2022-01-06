const axios = require("axios");

module.exports = {
  search: async function (searchTerm, numOfArticles, category) {
    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: `${searchTerm} ${category}`,
        count: numOfArticles,
        originalImg: 'true',
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "x-bingapis-sdk": "true",
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": "2a90fe5eb1msh5a1b9f8e424562bp10b8aejsnf19bb619e1bb",
      },
    };
    try {
      const response = await axios.request(options);

      return response.data.value;
    } catch (error) {
      console.error(error);
    }
  },
};
