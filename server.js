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
const fs = require('fs');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const {userLoggedIn , isAdmin} = require("./middleware/users");

// parse application/x-www-form-urlencoded
var cookieParser = require('cookie-parser');
// const { join } = require("path");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// Connection to Mongoose
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



//This is our root path now!
app.use(express.static('public'));
// express.static(path.join(__dirname, '/public'));

app.set('view engine', 'ejs')
app.use(morgan('tiny'));
app.use(cors());


// defined Controllers
app.use(authControllers);
app.use(donationControllers);
app.use(imgUploadControllers);
// app.use(jokesController);

// for every route, use middleware to check if user is logged in.
app.get('*' , userLoggedIn);


app.get('/'  , async (req,res)=>{

// The fs module provides a lot of very useful functionality to access and interact with the file system.
// @parameter files : The callback gets two arguments (err, files) 
//where files is an array of the names of the files in the directory excluding '.' and '..'.
  fs.readdir(__dirname +"/public/images/" , (err, files)=>{

    if(err){
      res.end("ERROR!");
    }
   res.render('index',{

    link : files,
  });

});

  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});