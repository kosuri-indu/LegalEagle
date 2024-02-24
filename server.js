const express = require('express');
const path = require('path');
const NewsAPI = require('newsapi');
const dotenv = require('dotenv');

dotenv.config();  

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const app = express();

app.use(express.static('public'));

app.get('/get-news', (req, res) => {
  newsapi.v2.everything({
    sources: 'google-news-in,the-hindu,the-times-of-india,bbc-news,the-verge',
    q: 'legal awareness',
    language: 'en',
  }).then(response => {
    res.json(response.articles);
  }).catch(error => {
    console.error(error);
    res.status(500).send('An error occurred while fetching news articles.');
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));