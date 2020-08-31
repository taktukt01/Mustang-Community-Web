 // routes/index.js
 const express = require('express');
 const router = express.Router();
//  const path = require("path");

const bodyParser = require('body-parser');

//  const pathFile = __dirname+'/Lonyamship Website/index.html';



router.use(bodyParser.urlencoded({
  extended: true
}));



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
donationAmount : 0 ,

    })

});

//  router.get("/formSuccess", function(req,res){
//    res.render("formSuccess");
//  });

//  router.post("/payment", async function(req,res){





//   console.log(JSON.stringify(req.body.donationAmount));
//   res.render('payment', {
//  donationAmount : req.body.donationAmount,
//  publish_key : publishable_key 


//   });



//  });

router.post("/payment", async (request,response)=>{

try {

  console.log(request.body);


  //stripe accepts payments in the form of cents. What?!
  // console.log(request.body.amountDonate * 100);
  // Create the PaymentIntent
  let intent = await stripe.paymentIntents.create({
    amount: request.body.amountDonate * 100, 
    currency: 'usd',
    payment_method: request.body.payment_method_id,

    // A PaymentIntent can be confirmed some time after creation,
    // but here we want to confirm (collect payment) immediately.
    confirm: true,

    // If the payment requires any follow-up actions from the
    // customer, like two-factor authentication, Stripe will error
    // and you will need to prompt them for a new payment method.>
    error_on_requires_action: true,

  });
  return generateResponse(response, intent);
} catch (e) {
  if (e.type === 'StripeCardError') {
    // Display error on client
    return response.send({ error: e.message });
  } else {
    // Something else happened
    return response.status(500).send({ error: e.type });
  }
}
});



function generateResponse(response, intent) {
if (intent.status === 'succeeded') {
  // Handle post-payment fulfillment
  return response.send({ success: true });
} else {
  // Any other status would be unexpected, so error
  return response.status(500).send({error: 'Unexpected status ' + intent.status});
}
}


 module.exports = router;