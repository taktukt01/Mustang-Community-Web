// //  Shift + Option + F to reformat code
// const express = require("express");

// //need along with passport
// const cors = require("cors");
// var passport = require("passport");

// const router = express.Router();
// require("dotenv").config();

// var randomstring = require("randomstring");

// //  upload files using fileUpload

// const fileUpload = require("express-fileupload");

// router.use(fileUpload());

// router.post("/upload", function (req, res) {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send("No files were uploaded.");
//   }

//     //the object -- our file
//     let file = req.files.imageUpload;

//   var randomFileName= randomstring.generate(8);

//     // Use the mv() method to place the file somewhere on your server
//     file.mv('./public/images/'+randomFileName+'.jpg', function(err) {
//       if (err)
//         return res.status(500).send(err);

//       res.send('File uploaded!');
//     });
//   });


// /*
// Multer -  will allow access to files submitted through the form
// Cloudinary - is used for configuration and uploading
// multer-storage-cloudinary will make the process of combining these easy.

// Source: https://www.freecodecamp.org/news/how-to-allow-users-to-upload-images-with-node-express-mongoose-and-cloudinary-84cefbdff1d9/
// */
// const multer = require("multer");
// var cloudinary = require("cloudinary").v2;
// const cloudinaryStorage = require("multer-storage-cloudinary");

// const cookieSession = require("cookie-session");

// const bodyParser = require("body-parser");
// const { closeDelimiter } = require("ejs");

// require("./passport-google");

// // var urlencodedParser = bodyParser.urlencoded({extended: false});
// router.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
// router.use(bodyParser.json());

// router.use(passport.initialize());
// router.use(passport.session());
// router.use(cors());

// router.use(
//   cookieSession({
//     name: "google-session",
//     keys: ["key1", "key2"],
//   })
// );

// const publishable_key = process.env.PUBLISHABLE_KEY;
// const secret_key_stripe = process.env.SECRET_KEY;
// const stripe = require("stripe")(secret_key_stripe);

// // Stripe JS

// router.get("/", (req, res) => {
//   res.render("index");
// });
// router.get("/payment", (req, res) => {
//   res.render("payment", {
//     //data here
//     publish_key: publishable_key,
//     amountDonate: 0,
//   });
// });

// router.post("/payment", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     submit_type: "donate",
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "Donation",
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: "http://localhost:5000/paymentSuccess",
//     cancel_url: "https://example.com/cancel",
//   });

//   res.json({
//     id: session.id,
//   });
// });

// router.get("/paymentSuccess", function (req, res) {
//   res.render("paymentSuccess");
// });

// // Passport JS

// // Auth middleware that checks if the user is logged in
// const isLoggedIn = (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     //  res.sendStatus(401);
//     res.send("Unauthorized credintals");
//   }
// };

// // GET /auth/google
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  The first step in Google authentication will involve redirecting
// //   the user to google.com.  After authorization, Google will redirect the user
// //   back to this application at /auth/google/callback
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// // GET /auth/google/callback
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  If authentication fails, the user will be redirected back to the
// //   login page.  Otherwise, the primary route function function will be called,
// //   which, in this example, will redirect the user to the home page.
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/failed",
//   }),
//   function (req, res) {
//     res.redirect("/good");
//   }
// );

// router.get("/failed", function (req, res) {
//   res.render("failed");
// });

// router.get("/good", isLoggedIn, function (req, res) {
//   res.send(`welcome  Mr. ${req.user.username}!`);
// });

// router.get("/logout", isLoggedIn, function (req, res) {
//   res.send("You are successfully logged out!");
// });

// router.get("/logout", (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect("/logout");
// });

// /*

// Cloudinary's Node.js SDK provides simple,
//  yet comprehensive image and video upload, transformation,
//   optimization, and delivery capabilities that you can implement
//    using code that integrates seamlessly with your existing Node.js application.

// */

// //  Configuration

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// // const storage = cloudinaryStorage({
// // cloudinary: cloudinary,
// // folder: "demo",
// // allowedFormats: ["jpg", "png"],
// // transformation: [{ width: 500, height: 500, crop: "limit" }]
// // });
// // const parser = multer({ storage: storage });

// module.exports = router;
