const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const mongoose = require('mongoose');
// var bodyParser = require('body-parser')
// // create application/json parser
// var jsonParser = bodyParser.json()
 
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })




router.get('/login' , authController.login_get);
router.post('/login'  , authController.login_post);
router.get('/register' , authController.register_get);
router.post('/register', authController.register_post);

router.get('/deleteAll', authController.remove_all_docs);





 
module.exports  = router;