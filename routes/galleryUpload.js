const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const imgUploadController = require('../controllers/imgUploadControllers');




router.use(fileUpload());

router.post('/upload', imgUploadController.upload_post);