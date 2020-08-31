"use strict";

// routes/index.js
var express = require('express');

var router = express.Router(); //  const path = require("path");

var bodyParser = require('body-parser'); //  const pathFile = __dirname+'/Lonyamship Website/index.html';


router.use(bodyParser.urlencoded({
  extended: true
}));
var publishable_key = process.env.PUBLISHABLE_KEY;
var secret_key_stripe = process.env.SECRET_KEY;

var stripe = require('stripe')(secret_key_stripe);

router.get("/", function (req, res) {
  res.render("index");
});
router.get("/payment", function (req, res) {
  res.render("payment", {
    //data here
    publish_key: publishable_key,
    donationAmount: 0
  });
}); //  router.get("/formSuccess", function(req,res){
//    res.render("formSuccess");
//  });
//  router.post("/payment", async function(req,res){
//   console.log(JSON.stringify(req.body.donationAmount));
//   res.render('payment', {
//  donationAmount : req.body.donationAmount,
//  publish_key : publishable_key 
//   });
//  });

router.post("/payment", function _callee(request, response) {
  var intent;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(request.body); //stripe accepts payments in the form of cents. What?!
          // console.log(request.body.amountDonate * 100);
          // Create the PaymentIntent

          _context.next = 4;
          return regeneratorRuntime.awrap(stripe.paymentIntents.create({
            amount: request.body.amountDonate * 100,
            currency: 'usd',
            payment_method: request.body.payment_method_id,
            // A PaymentIntent can be confirmed some time after creation,
            // but here we want to confirm (collect payment) immediately.
            confirm: true,
            // If the payment requires any follow-up actions from the
            // customer, like two-factor authentication, Stripe will error
            // and you will need to prompt them for a new payment method.>
            error_on_requires_action: true
          }));

        case 4:
          intent = _context.sent;
          return _context.abrupt("return", generateResponse(response, intent));

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);

          if (!(_context.t0.type === 'StripeCardError')) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", response.send({
            error: _context.t0.message
          }));

        case 14:
          return _context.abrupt("return", response.status(500).send({
            error: _context.t0.type
          }));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});

function generateResponse(response, intent) {
  if (intent.status === 'succeeded') {
    // Handle post-payment fulfillment
    return response.send({
      success: true
    });
  } else {
    // Any other status would be unexpected, so error
    return response.status(500).send({
      error: 'Unexpected status ' + intent.status
    });
  }
}

module.exports = router;