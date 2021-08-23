const asyncHandler = require('express-async-handler')
const Cart = require('../models/cartModels')
const User = require('../models/userModel')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.createPaymentIntent = asyncHandler(async (req, res) => {
  // 1 find user
  const user = await User.findOne({ email: req.user.email }).exec()
  // 2 get user cart total
  const { cartTotal, couponApplied, totalAfterDiscount } = await Cart.findOne({
    orderdBy: user._id,
  }).exec()

  if (couponApplied === false) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cartTotal * 100,
      currency: 'usd',
    })
    if (paymentIntent) {
      res.send({
        clientSecret: paymentIntent.client_secret,
      })
    } else {
      res.status(500)
      throw new Error('Stripe error on getting client_Secret')
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAfterDiscount * 100,
      currency: 'usd',
    })
    if (paymentIntent) {
      res.send({
        clientSecret: paymentIntent.client_secret,
      })
    } else {
      res.status(500)
      throw new Error('Stripe error on getting client_Secret')
    }
  }
})
