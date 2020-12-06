const express = require('express');
const Router = express.Router();
const losarVideos = require("../controllers/videosControllers").losar;




Router.get("/videos/losar" , (req,res)=>{

    res.render("losarVideos", {
        losarVideos,
    })
});








module.exports = Router;