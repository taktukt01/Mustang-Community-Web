const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');
const app = express();
const {google} = require('googleapis');
require('dotenv').config();



// I want the server to respond with all the videos of this certain Channel

google.youtube('v3').playlists.list( {
key: process.env.GOOGLE_API_KEY,
part: 'snippet',
id: ['PLq0KjKjR7nOxOSjTEAXOYSQksSKiFS1O9'],


}).then(resp => console.log(resp.data.items[0].snippet)).catch(err => console.log(err));



app.use(express.static('Lonyamship Website'));


app.use('/', require('./routes/index'));



app.use(morgan('tiny'));

app.use(cors());


app.get('/videos' , (req,res)=>{
  const url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PL9ZK2cZDBoaz5S2B-TiPrN7sLvF6R4rP3&maxResults=50';
fetch(`${url}&key=${process.env.GOOGLE_API_KEY}`)
.then(response => response.json())
.then(json => {

  res.json(json);
});


});


function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found');
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  });
}

app.use(notFound);
app.use(errorHandler);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});


    