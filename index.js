const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');
const app = express();
const {google} = require('googleapis');
require('dotenv').config();



// const publishable_key = process.env.publishable_key;
 
// const secret_key_stripe =  process.env.secret_key_stripe;

// I want the server to respond with all the videos of this certain Channel\

// app.get("/", (req,res)=>{
// // google.youtube('v3').videos.list( {
// // key: process.env.GOOGLE_API_KEY,
// // part: 'snippet',
// // id: 'VM-2xSaDxJc'

// // }).then(resp => console.log(resp.data)).catch(err => console.log(err));

// res.render('index');

// });




// google.youtube('v3').playlists.list( {
// key: process.env.GOOGLE_API_KEY,
// part: 'snippet',
// id: ['PLq0KjKjR7nOxOSjTEAXOYSQksSKiFS1O9'],


// }).then(resp => console.log(resp.data.items[0].snippet)).catch(err => console.log(err));


//This is our root path now!
app.use(express.static('public'));


app.set('view engine','ejs')


app.use('/', require('./routes/index'));

app.use(morgan('tiny'));

app.use(cors());





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


    