const express = require("express");
const router = express.Router();
// const fileUpload = require("express-fileupload");
// const imgUploadController = require('../controllers/imgUploadControllers');
const multer = require("multer");
// var upload = multer({ dest: 'uploads/' });
var path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/images');
    },
    filename: function (req, file, callback) {
      // callback(null, file.fieldname + '-' + Date.now() + '.jpg');
      callback(null, file.originalname ); //Appending extension
    }
  });


  const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


/*


Multer adds a body object and a file or files object to the request object.
 The body object contains the values of the text fields of the form,
  the file or files object contains the files uploaded via the form.
*/

// router.use(fileUpload());
// .any() -> Accepts all files that comes over the wire. An array of files will be stored in req.files.
var upload = multer({ storage : storage , fileFilter: fileFilter }).array('imageUpload',100);


router.post('/uploadFile', function (req, res) {
    upload(req,res,function(err) {
        console.log(req.body);
        console.log(req.files);
        if(err) {
            return res.end("Error uploading file. Max upload size is 100.");
        }
        res.redirect(req.get('referer')); 
      });
  });
module.exports = router;