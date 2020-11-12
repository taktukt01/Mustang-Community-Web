const User = require("../models/User.js");
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;




/*
This middleware checks to see.. 
*/
// check current user
const userLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, jwt_secret, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };


  const isAdmin  = (req,res,next)=>{
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, jwt_secret, async (err, decodedToken) => {
        
        if (err) {
          res.redirect("/");
        } else {
          let user = await User.findById(decodedToken.id);
          console.log(user.email);
          if(user.email !== "taktukgg@gmail.com"){
            res.redirect("/");
          }
          next();
        
        }
      });
    } else {
    res.redirect("/");
    }
  }
  



  module.exports = {userLoggedIn ,isAdmin};