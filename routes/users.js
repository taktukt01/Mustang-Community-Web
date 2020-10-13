const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://taktuk:'+process.env.MONGOOSE_PWD+'@cluster0.90g2u.mongodb.net/'+ process.env.DB_TITLE + '?retryWrites=true&w=majority';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
mongoose.promise = global.promise
mongoose.connection
.on('connected', () => {
    console.log(`mongooose conncetion open on ${process.env.DB_TITLE}`);
})
.on('error', (err) => {
    console.log(`connection error ${err.message}`)
})




router.get('/login' , authController.login_get);
router.post('/login' , authController.login_post);
router.get('/register' , authController.register_get);
router.post('/register' , authController.register_post);




 
module.exports  = router;