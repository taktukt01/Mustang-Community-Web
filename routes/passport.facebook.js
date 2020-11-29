const express = require('express');
const router = express.Router();

// Configurations
const User = require('../models/User');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

const fb_app_id = process.env.FACEBOOK_APP_ID;
const fb_app_secret = process.env.FACEBOOK_CLIENT_SECRET;

passport.use(new FacebookStrategy({
    clientID: fb_app_id,
    clientSecret: fb_app_secret,
    callbackURL: "http://localhost:5000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(profile.value,
         function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));






module.exports = router;