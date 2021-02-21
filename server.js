const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
// const fetch = require('node-fetch');
const app = express();
require('dotenv').config({
  silent: process.env.NODE_ENV === 'production' 
})
const fs = require('fs');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const excelToJson = require('convert-excel-to-json');
const path = require('path');

// Importing Controllers to be used
const authControllers = require('./routes/users');
const donationControllers = require('./routes/payment');
const imgUploadControllers = require('./routes/galleryUpload');
const fbAuth = require('./routes/passport.facebook');

const members = require('./routes/members');
// const videos = require('./routes/youtubeApi');

const {userLoggedIn } = require("./middleware/users");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//This is our root path now!
// app.use(express.static(path.join(__dirname +'/public')));
app.use(express.static(__dirname + '/public'));

// express.static(path.join(__dirname, '/public'));

app.set('view engine', 'ejs')

app.set('views', [
  path.join(__dirname,'views'),
  path.join(__dirname,'views/stripe/'),
]);
app.use(morgan('tiny'));
app.use(cors());


// defined Controllers
app.use(authControllers);
app.use(donationControllers);
app.use(imgUploadControllers);
app.use(fbAuth);
app.use('/members', members);
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



// EJS LINT

const ejsLint = require('ejs-lint');

ejsLint("losarVideos");

// String.prototype.capitalize = function() {
//   return this.charAt(0).toUpperCase() + this.slice(1);
// }


//if first or last name is not upper case, then capitalize it
// function namesCapitalized(name){
//   var names = name.split(" ");    // ['first' , 'last']
//   var ret ="";
//   names.forEach( (val , idx)=>{

//     if(val.charAt(0) == val.charAt(0).toLowerCase()){ //if first/last name lowercase
//       if(idx == 0 ){
//         ret += val.capitalize() + " ";  // "Bob ";
//       }else{
//         ret += val.capitalize();
//       }
 
//     }

//   });

//   return ret;
//   } // ["First", "Last"]

/*

some verifications for excel ..
1. If Name not capitalized, "Bob dylan" ->  "Bob Dylan"
2. Make sure phone number is valid
3. Make sure email is valid
*/

//@param : array of objects
//@returns a fresh array of object with corrections, if needed.

// const { isEmail , isMobilePhone} = require('validator');


// function excelVerifications(excel){
//   console.log(excel);
//   for(var members in excel){
//   var name = members.Name;
//   var phone = members.Phone;
//   var email = members.Email;
  
//   members.Name = namesCapitalized(name);
//   if(!isEmail(email)){
//     members.Email = "";
//   }

//   if(!isMobilePhone(phone)){
//     members.Phone = "";
//   }




//   }
//   return excel;
// }

// Grabbing excel data.
function extractExcelExecutive(file){
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


app.get('*' , userLoggedIn);

app.get('/'  , async (req,res)=>{

  const executiveMembers = extractExcelExecutive("excel/ExecutiveMembers.xlsx");  //getting excel data about executive members
  // const boardMembers = extractExcel("excel/BoardMembers.xlsx");
  const newMembers = extractExcel("excel/NewMembers.xlsx");

// @link : src for each photo to be used for photo gallery
  //@ executiveMembers,board,members => parsed excel data -> array of json objects containing information about members 
fs.readdir(__dirname +"/public/images/" , (err, files)=>{


    if(err){
      res.end("ERROR!");
    }

   res.render('index',{
    link : files,
    executiveMembers,
    newMembers ,

  });

});

  });

  app.get('/contact', (req,res)=>{
    res.render("contact");
  })



  // Authentication flow for Youtube API.
  // https://github.com/googleapis/google-api-nodejs-client#authentication-and-authorization
var {google} = require('googleapis');
const Oauth2Data = require('./client_secret.json');

const CLIENT_ID = Oauth2Data.web.client_id;
const CLIENT_SECRET = Oauth2Data.web.client_secret;
// const REDIRECT_URL = Oauth2Data.web.redirect_uris[2];
const REDIRECT_URL = Oauth2Data.web.redirect_uris[0];


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

// authPage --> button that redirects to google sign in
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
      res.redirect("losar");
    }
    });

    // Implement pagination...
    // 
    app.get("/losar", (req,res)=>{

        res.render("losarVideos" , {
          losarVideos : app.get('losarVideos'),
        });
            });

    app.get("/google/callback", function (req, res) {
        const code = req.query.code; //error here...
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
            
              /*

This example retrieves playlists owned by the YouTube channel that the request's channelId parameter identifies.
We need to be able to grab this from ANY google account.
                    */
var service = google.youtube('v3');
  service.playlistItems.list({
    auth: oAuth2Client,
    part: 'snippet',
    channelId: 'UC2SNlDbjU5MJv2u6CcCwvmA',
    playlistId: 'PLq0KjKjR7nOxUefgQDoXiFxs9Ze3bLPxN',
    maxResults: 100,

  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      res.json(err);
    }
    
    for (var i = 0; i < response.data.items.length; i++) {
      losarVideos[i] = response.data.items[i];
    }
    // losarVideos -> list of URL of videos in playlist
    app.set('losarVideos' , losarVideos);
    res.redirect("/losar");
    // https://lonyamship.herokuapp.com/losar
        // res.redirect("/losar");

            });
        }
      });
    }
});


// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log('Listening on port', port);
// });
var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});