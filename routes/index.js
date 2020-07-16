 // routes/index.js
 const express = require('express');
 const router = express.Router();
 const path = require("path")

 router.get("/", (req, res) => {

    res.sendFile(path.join(pathFile));
    //__dirname : It will resolve to your project folder.
  });


  router.get("/payment" , (req,res)=>{

    res.sendFile("/Users/dodo/Desktop/Mustang-Community-Web/Lonyamship Website/payment.html");
  });




 module.exports = router;