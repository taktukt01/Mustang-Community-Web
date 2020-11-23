/*
Multer -  will allow access to files submitted through the form
Cloudinary - is used for configuration and uploading
multer-storage-cloudinary will make the process of combining these easy.

Source: https://www.freecodecamp.org/news/how-to-allow-users-to-upload-images-with-node-express-mongoose-and-cloudinary-84cefbdff1d9/
*/
const multer = require("multer");
var upload = multer({ dest: 'uploads/' });



// Flow:
// User uploads multiple images --> sends to our directory.. our page refreshes and shows all images 


module.exports.image_upload = (req,res) => {


}




























// var cloudinary = require("cloudinary").v2;
// const cloudinaryStorage = require("multer-storage-cloudinary");
// var randomstring = require("randomstring");


//for now, single image uploads will do.

  /*

  Cloudinary's Node.js SDK provides simple,
 yet comprehensive image and video upload, transformation,
  optimization, and delivery capabilities that you can implement
   using code that integrates seamlessly with your existing Node.js application.

*/

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
//   });


//   module.exports.upload_post = (req,res)=>{

//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send("No files were uploaded.");
//   }

//     //the object -- our file
//     let file = req.files.imageUpload;

//   var randomFileName= randomstring.generate(8);

//     // Use the mv() method to place the file somewhere on your server
//     file.mv('./public/images/'+randomFileName+'.jpg', function(err) {
//       if (err){
//         return res.status(500).send(err);
//       }
//       res.send('File uploaded!');
    
//     });
// }