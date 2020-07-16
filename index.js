const express = require("express");
const path = require("path");

const app = express();



const pathFile = __dirname+'/Lonyamship Website/index.html';

app.use(express.static('Lonyamship Website'));


app.use('/', require('./routes/index'));
// What is a middleware?

// Will we need to use database at any point?

// How to add user registration

  app.listen(3000, function () {
    console.log("Express server listening on port 3000");
    });


    