"use strict";

var stripe = Stripe('pk_test_51H4eyVBq0r2kQNINF2la8aTYQHxI8JlmEOzoZfIiFspwinqAwW6yzt5rENS4af2s1KTA3mxzxPi8rUkQ8osXwlLN00AXf08zlI');
console.log(data.donationAmount);
stripe.redirectToCheckout({
  lineItems: [// Replace with the ID of your price
  {
    price: data.donationAmount,
    quantity: 1
  }],
  mode: 'payment',
  successUrl: 'https://your-website.com/success',
  cancelUrl: 'https://your-website.com/canceled'
}).then(function (result) {// If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `result.error.message`.
});