const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
// const fetch = require('node-fetch');
const app = express();

const authControllers = require('./routes/users');
const donationControllers = require('./routes/payment');
const imgUploadControllers = require('./routes/galleryUpload');



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
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(morgan('tiny'));
app.use(cors());



app.use(authControllers);
app.use(donationControllers);
app.use(imgUploadControllers);


app.get('/' , (req,res)=>{
  res.render('index');
});




const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});