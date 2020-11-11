//  Shift + Option + F to reformat code
 const express = require('express');
 const router = express.Router();
 const cookieSession = require('cookie-session')
const donationController = require('../controllers/donationControllers');

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })



//router.get (PATH , controller);x

 router.get("/payment", donationController.payment_get);
 router.post("/payment",urlencodedParser, donationController.payment_post);

 router.get("/paymentSuccess", donationController.payment_success);
 router.get("/failed", donationController.payment_failed);






 module.exports = router;