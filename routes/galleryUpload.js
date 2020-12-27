const express = require("express");
const router = express.Router();
const multer = require("multer");
const {userLoggedIn, isAdmin , galleryUserLogIn} = require("../middleware/users");
const fs = require('fs');


/*
Multer allows us to access our files via req.files and values of form using req.body
Each function gets passed both the request (req) and some information about the file (file) to aid with the decision.
*/
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/images');
    },

    filename: function (req, file, callback) {
      // callback(null, file.fieldname + '-' + Date.now() + '.jpg');
      callback(null, file.originalname ); //Appending extension
    }
  });

// Filters such that only jpg/png files are accepted.
  const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


// alternatively:  .any() -> Accepts all files that comes over the wire. An array of files will be stored in req.files.
// We are telling multer WHERE to store the uploaded files and WHAT to name them, and we are storing the result
// req.files will be an array of (up to 100 files )
var upload = multer({ storage : storage , fileFilter: fileFilter }).array('imageUpload',100);


router.post('/uploadFile', userLoggedIn, function (req, res) {

  // if(res.locals.user){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file. Max upload size is 100.");
        }
        console.log("files..." , req.files);
        res.redirect(req.get('referer'));  // refreshes the page
      });
    });
// PopUp Register page if user is not logged in.
// res.redirect("/register");
  // });



  router.get("/gallery", (req,res)=>{
    fs.readdir(__dirname +"/../public/images/" , (err, files)=>{

      if(err){
        res.end("ERROR!");
      }

res.render("gallery", {
link : files,

});

  });

});

router.post("/gallery", (req,res)=>{
  // get iTH index
const indexToDelete = req.body.index;

fs.readdir(__dirname +"/../public/images/" , (err, files)=>{

  // console.log( files[indexToDelete] );    //filename.jpg


  
  fs.unlink(__dirname +"/../public/images/"+files[indexToDelete] , (err)=>{
    console.log(err);
  })
// wonder if i can get the file dir of files[i]
});

res.redirect("/gallery");
// refresh 
// res.redirect('back');
});


  

module.exports = router;