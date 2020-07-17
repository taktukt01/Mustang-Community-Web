const express = require("express");
const path = require("path");

const app = express();




app.use(express.static('Lonyamship Website'));


app.use('/', require('./routes/index'));
// What is a middleware?

// Will we need to use database at any point?

// How to add user registration

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")("sk_test_51H4eyVBq0r2kQNIN20FfaWR9XFSxkWOQNDAtqG35QZQENhWsyLFrhC8EvX1HGDKolbHbXSFKaECbbtfrGyzalg2s00vPhq2PrE");

// Token is created using Stripe Checkout or Elements!
// Get the payment token ID submitted by the form:

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});



  app.listen(3000, function () {
    console.log("Express server listening on port 3000");
    });


    