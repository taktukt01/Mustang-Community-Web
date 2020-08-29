 // routes/index.js
 const express = require('express');
 const router = express.Router();
//  const path = require("path");

const bodyParser = require('body-parser');

//  const pathFile = __dirname+'/Lonyamship Website/index.html';



router.use(bodyParser());



const publishable_key = process.env.PUBLISHABLE_KEY;
 
const secret_key_stripe =  process.env.SECRET_KEY;


// const stripe = require('stripe')(secret_key_stripe)
// const session = await stripe.checkout.sessions.create({
//   success_url: '',
//   cancel_url: '',
//   payment_method_types: ['card'],
//   line_items: [
//     {
//       unit_amount:   ,
//       quantity: 1},
//   ],
//   mode: 'payment',
// });


router.get("/", (req,res)=>{

  res.render("index");
})


  router.get("/payment", (req,res) =>{
    res.render("payment" , {
//data here
publish_key : publishable_key



    })

});








 router.get("/formSuccess", function(req,res){
   res.render("formSuccess");
 });

 router.post("/payment", function(req,res){
  res.render('formSuccess', {
 data : req.body ,
 

  });
 });


 module.exports = router;