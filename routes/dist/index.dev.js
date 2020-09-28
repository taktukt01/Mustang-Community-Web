"use strict";

//  Shift + Option + F to reformat code
var express = require('express');

var cors = require('cors');

var router = express.Router(); //  const path = require("path");

var passport = require('passport');

require('dotenv').config();

var cookieSession = require('cookie-session');

var bodyParser = require('body-parser');

var _require = require('ejs'),
    closeDelimiter = _require.closeDelimiter;

require("./passport-google"); // var urlencodedParser = bodyParser.urlencoded({extended: false});


router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());
router.use(passport.initialize());
router.use(passport.session());
router.use(cors());
router.use(cookieSession({
  name: 'google-session',
  keys: ['key1', 'key2']
}));
var publishable_key = process.env.PUBLISHABLE_KEY;
var secret_key_stripe = process.env.SECRET_KEY;

var stripe = require('stripe')(secret_key_stripe); // Stripe JS


router.get("/", function (req, res) {
  res.render("index");
});
router.get("/payment", function (req, res) {
  res.render("payment", {
    //data here
    publish_key: publishable_key,
    amountDonate: 0
  });
});
router.post("/payment", function _callee(req, res) {
  var session;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(stripe.checkout.sessions.create({
            submit_type: 'donate',
            payment_method_types: ["card"],
            line_items: [{
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Donation"
                },
                unit_amount: 2000
              },
              quantity: 1
            }],
            mode: "payment",
            success_url: "http://localhost:5000/paymentSuccess",
            cancel_url: "https://example.com/cancel"
          }));

        case 2:
          session = _context.sent;
          res.json({
            id: session.id
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/paymentSuccess", function (req, res) {
  res.render("paymentSuccess");
}); // Passport JS
// Auth middleware that checks if the user is logged in

var isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    //  res.sendStatus(401);
    res.send("Unauthorized credintals");
  }
}; // GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback


router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
})); // GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/failed'
}), function (req, res) {
  res.redirect('/good');
});
router.get("/failed", function (req, res) {
  res.render("failed");
});
router.get("/good", isLoggedIn, function (req, res) {
  res.send("welcome  Mr. ".concat(req.user.username, "!"));
});
router.get("/logout", isLoggedIn, function (req, res) {
  res.send("You are successfully logged out!");
});
router.get("/logout", function (req, res) {
  req.session = null;
  req.logout();
  res.redirect("/logout");
});
module.exports = router;