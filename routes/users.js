const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })





router.get('/login' , authController.login_get);
router.post('/login' , urlencodedParser , authController.login_post);
router.get('/register' , authController.register_get);
router.post('/register' ,urlencodedParser, authController.register_post);




 
module.exports  = router;