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
const videos = require('./routes/youtubeApi');

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
app.use(videos);


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



app.get("/api/test", (req,res)=>{
  const executiveMembers = extractExcelExec("Members.xlsx");
  executiveMembers.forEach(element,idx =>{
    console.log(element);
  });
    res.json(executiveMembers);
});


app.get('*' , userLoggedIn);

app.get('/'  , async (req,res)=>{

 
  const executiveMembers = extractExcelExec("Members.xlsx");

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


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});