const cheerio = require('cheerio');
const request = require('request');
const express = require('express');
const router = express.Router();



request('https://kidsit.com/kids-jokes#puns', function (error, response, body) {
const $ = cheerio.load(body);
const question = $('white-card h3').text();
const answer = $('white-card p').text();
});

router.get("/jokes" , (req,res)=>{
res.render("jokes");
});


module.exports = router;
