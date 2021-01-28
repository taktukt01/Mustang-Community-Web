const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const mongoose = require('mongoose');
const {isAdmin} = require("../middleware/users");





router.get('/login' , authController.login_get);
router.post('/login'  , authController.login_post);
router.get('/register' , authController.register_get);
router.post('/register', authController.register_post);
router.get('/logout', authController.logout);


router.get('/admin' ,isAdmin, authController.admin_get);
router.delete('/admin' ,isAdmin, authController.admin_post_delete);
router.put('/admin', isAdmin, authController.admin_post_update);
router.get('/adminHome' ,isAdmin, authController.adminHome_get);

router.get('/settings' , authController.settings_get);
// router.post('/settings' , authController.settings_post);


//only logged in users will be able to VIEW/USE this
router.post('/updatePassword', authController.update_password );
router.post('/updateEmail', authController.update_email );




router.get('/deleteAll', authController.remove_all_docs);





 
module.exports  = router;