//  Shift + Option + F to reformat code
 const express = require('express');
 const router = express.Router();
 const cookieSession = require('cookie-session')
 const bodyParser = require('body-parser');
const donationController = require('../controllers/donationControllers');


//  router.use(bodyParser.urlencoded({
//    extended: false
//  }));
//  router.use(bodyParser.json())

//  router.use(cors());

//router.get (PATH , controller);

 router.get("/payment", donationController.payment_get);
 router.post("/payment", donationController.payment_post);

 router.get("/paymentSuccess", donationController.payment_success);
 router.get("/failed", donationController.payment_failed);






 module.exports = router;