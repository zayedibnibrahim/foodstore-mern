const asyncHandler = require('express-async-handler')

const Stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.createPaymentIntent = asyncHandler(async (req, res) => {
  const paymentIntent = await Stripe.paymentIntents.create({
    amount: 100,
    currency: 'usd',
  })
  if (paymentIntent) {
    res.json({
      clientSecret: paymentIntent.client_Secret,
    })
  }
})
