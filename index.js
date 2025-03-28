const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/scrape', async (req, res) => {
    const url = req.query.url; 

    if (!url) {
        return res.status(400).send('URL parameter is required');
    }

    try {
      
        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        const text = $('body').text().trim();

        res.send({ text });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error scraping the webpage');
    }
});

app.listen(port, () => {
    console.log(`Web scraper API is running at http://localhost:${port}`);
});
