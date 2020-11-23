const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
// const fetch = require('node-fetch');
const app = express();
require('dotenv').config()
const jwt = require('jsonwebtoken');

const {User, Admin} = require("./models/User")
const path = require('path');


const authControllers = require('./routes/users');
const donationControllers = require('./routes/payment');
const imgUploadControllers = require('./routes/galleryUpload');
// const jokesController = require('./routes/jokes');

const fs = require('fs');

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');


var bodyParser = require('body-parser');
const {userLoggedIn , isAdmin} = require("./middleware/users");
// parse application/x-www-form-urlencoded
var cookieParser = require('cookie-parser');
// const { join } = require("path");
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



const dbUri = 'mongodb+srv://taktuk:'+process.env.MONGOOSE_PWD+'@cluster0.90g2u.mongodb.net/'+ process.env.DB_TITLE + '?retryWrites=true&w=majority';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
mongoose.promise = global.promise
mongoose.connection
.on('connected', () => {
    console.log(`mongooose conncetion open on ${process.env.DB_TITLE}`);
})
.on('error', (err) => {
    console.log(`connection error ${err.message}`)
})



//DISPLAY RECENT VIDEOS ON YOUTUBE CHANNEL. 
// OR CAN JUST HAVE YOUTUBE A TAG for the mean time



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
// app.use(express.static('public'));
express.static(path.join(__dirname, '/public'));

app.set('view engine', 'ejs')
app.use(morgan('tiny'));
app.use(cors());



app.use(authControllers);
app.use(donationControllers);
app.use(imgUploadControllers);
// app.use(jokesController);


app.get('*' , userLoggedIn);



app.get('/'  , async (req,res)=>{
// var fullLink= [];
// var l = [];

  fs.readdir(__dirname +"/public/images/" , (err, files)=>{

    if(err){
      res.end("ERROR!");
    }

   for(let i =0; i< files.length ; i++){
    //  var partialLink = path.join(__dirname , "/public/images/" , files[i]);
     files[i] = path.join("/public/images/" , files[i]) ;
   }
   console.log(files);


   res.render('index',{

    link : files,
    // galleryFiles :   files ,
  });


  });

  console.log(fullLink);
// if jwt exists, check
// req.cookies
//isAdmin : Admin.find({jwt})
 

});



// fs.readdir(path[, options], callback)
//access files in a directory
/*
The callback gets two arguments
 (err, files) where files is an array of the names of the files in the directory 
*/







const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});