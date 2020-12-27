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
//  I want to grab user's input (donation amount) and enter it to unit_amount.
module.exports.payment_post = async (req,res)=>{

console.log(req.body);

   const session = await stripe.checkout.sessions.create({
    submit_type: 'donate',
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: {
          name: "Donation"
        },
        unit_amount: 2000
      },
      quantity: 1,
    }, ],
    mode: "payment",
    success_url: "http://localhost:5000/paymentSuccess",
    cancel_url: "https://example.com/cancel",
  });


  res.json({
    id: session.id
  });

}


module.exports.amountDonate = (req,res)=>{
  
}

module.exports.payment_success = (req,res)=>{
    res.render('paymentSuccess');
}


module.exports.payment_failed = (req,res)=>{
    res.render('failed');
}
