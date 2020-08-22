 // routes/index.js
 const express = require('express');
 const router = express.Router();
 const path = require("path");

 const pathFile = __dirname+'/Lonyamship Website/index.html';



  router.get("/payment", (req,res) =>{
    console.log(__dirname);
    res.sendFile(__dirname + "/payment.html");
});



// });

  
//  router.get("/", (req, res) => {

//     res.sendFile(path.join(pathFile));
//   });







 module.exports = router;