const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require('body-parser'); // Middleware 
const axios = require('axios')
const cheerio = require('cheerio')
// const puppeteer = require('puppeteer');
// const request = require('request');
// const fs = require('fs');
const ejs = require("ejs");
// const { AddressContext } = require('twilio/lib/rest/api/v2010/account/address');
const { getElementsByTagType } = require('domutils');

app.set('view engine', 'ejs');
app.set('views',__dirname);

app.use(bodyParser.urlencoded({ extended: false }));  //*//
app.use(bodyParser.json());
// var newItem;
// Route to Login Page
app.get('/', (req, res) => {
    // console.log(res)
    res.sendFile(__dirname + '/login.html');
});

// app.post('/', (req, res) => {
//     res.sendFile(__dirname + '/login.html');
// });

app.post('/result', async(req, res) => {

    // app.get('/', (req, res) => {

    const final = []

    extractLinkFromBing = async (url) => {
    try {
        // Fetching HTML
        const { data } = await axios.get(url)
        // console.log(typeof(data));
        // console.log(data)

        // Using cheerio to extract <a> tags
        const $ = cheerio.load(data);
        // console.log($.html());

        const rawUrl = $('li[class=b_algo] h2 a').first().attr('href');
        console.log(rawUrl);
        if (rawUrl != undefined) {
            return rawUrl
        } else {
            return '';
        }
        // url = rawUrl.split("/url?q=")[1].split("&")[0];
        // console.log('Extracting url: ', url);


    } catch (error) {
        // res.sendFile(__dirname + '/try.html');
        // res.sendFile(__dirname + '/error.html');
        console.log(error);
        return {};
    }
};

    const s = req.body.search + '\n';
    console.log(s)
    final.push(s);

    await extractLinkFromyahoo(`https://www.bing.com/search?q=${s}&ad=dirN&o=0`)
    res.render(__dirname+'/final', { final: final })


});
const port = process.env.PORT || 1000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));
