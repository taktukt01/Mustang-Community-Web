 // routes/index.js
 const express = require('express');
 const router = express.Router();
 const path = require("path")
 const pathFile = __dirname+'/Lonyamship Website/index.html';

//  router.get("/", (req, res) => {

//     res.sendFile(path.join(pathFile));
//   });


  router.get("/videos", (req,res) =>{
    res.sendFile(__dirname+'/Lonyamship Website/video.html');
  });







 module.exports = router;