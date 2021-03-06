const express = require('express');
const router = express.Router();
//for passport auth

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
      return done(null, profile.displayName);
    }
  ));
  
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
  
  router.use(require('express-session')({ secret: fb_app_secret, resave: true, saveUninitialized: true }));
  
  
  
  // Initialize Passport and restore authentication state, if any, from the
  // session.
  router.use(passport.initialize());
  router.use(passport.session());
  
  
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook',
 passport.authenticate('facebook',{
  scope: ['public_profile', 'email']
}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',    failureRedirect: '/login' }));





module.exports = router;
