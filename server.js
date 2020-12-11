const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
// const fetch = require('node-fetch');
const app = express();
require('dotenv').config()
const fs = require('fs');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const excelToJson = require('convert-excel-to-json');



// Importing Controllers to be used
const authControllers = require('./routes/users');
const donationControllers = require('./routes/payment');
const imgUploadControllers = require('./routes/galleryUpload');
const fbAuth = require('./routes/passport.facebook');
// const videos = require('./routes/youtubeApi');

const {userLoggedIn } = require("./middleware/users");




app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

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
app.use(fbAuth);
// app.use(videos);


// Connection to Mongoose
const dbUri = 'mongodb+srv://taktuk:'+process.env.MONGOOSE_PWD+'@cluster0.90g2u.mongodb.net/'+ process.env.DB_TITLE + '?retryWrites=true&w=majority';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
mongoose.promise = global.promise
mongoose.connection
.on('connected', () => {
    console.log(`Mongooose connection open on ${process.env.DB_TITLE} , have a good day!`);
})
.on('error', (err) => {
    console.log(`Connect error: ${err.message}`)
})




// Grabbing excel data.
function extractExcelExec(file){
  const result = excelToJson({
    sourceFile: file,  //"Members.xlsx"
    header: 
    { 
      rows: 1,            //row to be skipped
    },
  
    columnToKey: {    // renaming the columns 
  A : 'Name' ,
  B  : 'Title',
  C  : 'Phone',
  D  : 'Email', 
  E  : 'Facebook',
  
    }
  });
  return result.Sheet1; // array of objects
}


function extractExcel(file){
  const result = excelToJson({
    sourceFile: file,  //"Members.xlsx"
    header: 
    { 
      rows: 1,            //row to be skipped
    },
  
    columnToKey: {    // renaming the columns 
  A : 'Name' ,
  B  : 'Phone',
  C  : 'Email', 
  D  : 'Facebook',
  
    }
  });
  return result.Sheet1; // array of objects
}



// app.get("/api/test", (req,res)=>{
//   const executiveMembers = extractExcelExec("Members.xlsx");
//     res.json(executiveMembers);
// });


app.get('*' , userLoggedIn);

app.get('/'  , async (req,res)=>{

  const executiveMembers = extractExcelExec("Members.xlsx");

  // console.log(executiveMembers);

// @parameter files : The callback gets two arguments (err, files) 
//where files is an array of the names of the files in the directory excluding '.' and '..'.
  fs.readdir(__dirname +"/public/images/" , (err, files)=>{

    if(err){
      res.end("ERROR!");
    }

    console.log(req.user);
   res.render('index',{
    // user: req.user[displayName] ,
    link : files,
    executiveMembers,
    // boardMembers : 
    // newMembers :   ,

  });

});

  });


  // const express = require('express');
// const Router = express.Router();
// var fs = require('fs');
var {google} = require('googleapis');
const Oauth2Data = require('./client_secret.json');

const CLIENT_ID = Oauth2Data.installed.client_id;
const CLIENT_SECRET = Oauth2Data.installed.client_secret;
const REDIRECT_URL = Oauth2Data.installed.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
var authed = false;

var losarVideos = []

var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

/*

OAuth2 - This allows you to make API calls on behalf of a given user. 
In this model, the user visits your application, 
signs in with their Google account, and provides your application with authorization against a set of scopes

*/
app.get("/authPage", (req, res) => {
    if (!authed) {
      // Generate an OAuth URL and redirect there
      var url = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
      });
      res.render("youtubeAuth", { url: url });
    } else {
      var oauth2 = google.oauth2({
        auth: oAuth2Client,
        version: "v2",

      });
      res.redirect("/videos/losar");
    }
    });

    // Implement pagination...
    // 
    app.get("/videos/losar", (req,res)=>{
      console.log("HEllo   ", losarVideos);

        res.render("losarVideos" , {
          losarVideos : app.get('losarVideos'),
        });
            });


    app.get("/google/callback", function (req, res) {
        const code = req.query.code;
        if (code) {
          // Get an access token based on our OAuth code
          oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
              console.log("Error authenticating");
              console.log(err);
            } else {
              console.log("Successfully authenticated");
              console.log(tokens);
              oAuth2Client.setCredentials(tokens);
      
              authed = true;
            
                    // do some fancy shit here

                    /*

This example retrieves playlists owned by the YouTube channel that the request's channelId parameter identifies.
We need to be able to grab this from ANY google account.
                    */
var service = google.youtube('v3');
  service.playlistItems.list({
    auth: oAuth2Client,
    part: 'snippet',
    playlistId: 'PLq0KjKjR7nOxUefgQDoXiFxs9Ze3bLPxN',
    maxResults: 100,

  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      res.json(err);
    }
    
console.log("data returned from API..." + response.data.items);
    for (var i = 0; i < response.data.items.length; i++) {
      losarVideos[i] = response.data.items[i];
    }
    app.set('losarVideos' , losarVideos);
    res.redirect("/videos/losar");

            });
        }
      });
    }
});







const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});