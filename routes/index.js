 // routes/index.js
 const express = require('express');
 const router = express.Router();
//  const path = require("path");

const bodyParser = require('body-parser');




var urlencodedParser = bodyParser.urlencoded({extended: false});
router.use(bodyParser.json())


const publishable_key = process.env.PUBLISHABLE_KEY;
const secret_key_stripe =  process.env.SECRET_KEY;
const stripe = require('stripe')(secret_key_stripe)



router.get("/", (req,res)=>{

  res.render("index");
})


  router.get("/payment", (req,res) =>{
    res.render("payment" , {
//data here
publish_key : publishable_key,
amountDonate : 0 ,

    })

});


router.post("/payment", urlencodedParser, async (req, res) => {


  const session = await stripe.checkout.sessions.create({
    submit_type: 'donate',
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Donation"
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5000/paymentSuccess",
    cancel_url: "https://example.com/cancel",
  });


  res.json({ id: session.id 
  });
});



 router.get("/paymentSuccess", function(req,res){
   res.render("paymentSuccess");
 });

//  router.post("/payment", async function(req,res){





//   console.log(JSON.stringify(req.body.donationAmount));
//   res.render('payment', {
//  donationAmount : req.body.donationAmount,
//  publish_key : publishable_key 


//   });



//  });

 module.exports = router;