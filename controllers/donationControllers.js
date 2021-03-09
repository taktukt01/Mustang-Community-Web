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

  console.log("...", req.body);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: req.body.donationAmt * 1000,
          product_data:{
            name: "Donation"
          }
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://mail.google.com/mail/u/0/',
    cancel_url: 'https://google.com/'
  });
  res.json({ id: session.id });

}


module.exports.payment_success = (req,res)=>{
    res.render('paymentSuccess');
}


module.exports.payment_failed = (req,res)=>{
    res.render('failed');
}
