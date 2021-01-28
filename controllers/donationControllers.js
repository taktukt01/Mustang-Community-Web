const publishable_key = process.env.PUBLISHABLE_KEY;
const secret_key_stripe = process.env.SECRET_KEY;
const stripe = require('stripe')(secret_key_stripe)



module.exports.payment_get = (req,res)=>{

res.render('payment', {
    //data here
    publish_key: publishable_key,
    amountDonate: 0,

})};

// Stripe's API allows users to make payment to our website.
//  I want to grab user's input (donation amount) and enter it to unit_amount.\

// Membership Fee

/*
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }

http://expressjs.com/en/guide/routing.html#route-parameters
*/
module.exports.payment_post = async (req,res)=>{

  // fixed  --> Fixed $50 payment
  // custom  --> User input donation amount


  switch(req.params.paymentType){
    case("fixed"):
    const session = await stripe.checkout.sessions.create({
      submit_type: 'donate',
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: "Donation"
          },
          unit_amount: 50000
        },
        quantity: 1,
      }, ],
      mode: "payment",
      success_url: "localhost:5000/paymentSuccess",
      cancel_url: "localhost:5000/failed",
  
    });
    break;
    case("custom"):
    const session2 = await stripe.checkout.sessions.create({
      submit_type: 'donate',
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: "Donation"
          },
          unit_amount: req.body.donationAmount * 1000
        },
        quantity: 1,
      }, ],
      mode: "payment",
      success_url: "localhost:5000/paymentSuccess",
      // cancel_url: "localhost:5000/failed",
  
    });
break;
}

  res.json({
    id: session.id,
    id2: session2.id

  });

}


module.exports.payment_success = (req,res)=>{
    res.render('paymentSuccess');
}


module.exports.payment_failed = (req,res)=>{
    res.render('failed');
}
