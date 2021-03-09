//  Shift + Option + F to reformat code
 const express = require('express');
 const router = express.Router();
const donationController = require('../controllers/donationControllers');
var bodyParser = require('body-parser');
const { route } = require('./users');
var urlencodedParser = bodyParser.urlencoded({ extended: false })



//router.get (PATH , controller);

 router.get("/payment", donationController.payment_get);
 router.post("/payment",urlencodedParser, donationController.payment_post);
// route.post("/payment" , urlencodedParser , donationC)
 router.get("/paymentSuccess", donationController.payment_success);
 router.get("/failed", donationController.payment_failed);



 module.exports = router;