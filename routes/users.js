const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const mongoose = require('mongoose');
const {userLoggedIn, isAdmin} = require("../middleware/users");





router.get('/login' , authController.login_get);
router.post('/login'  , authController.login_post);
router.get('/register' , authController.register_get);
router.post('/register', authController.register_post);
router.get('/logout', authController.logout);
router.get('/admin' ,isAdmin, authController.admin_get);
router.post('/admin' , authController.admin_post);



router.get('/deleteAll', authController.remove_all_docs);





 
module.exports  = router;