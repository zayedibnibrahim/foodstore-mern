const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Cart = require('../models/cartModels')
const Coupon = require('../models/couponModels')

// @desc    POST cart
// @route   POST /api/cart
// @access  Private
exports.dbCart = asyncHandler(async (req, res) => {
  const { cart } = req.body

  let products = []

  const user = await User.findOne({ email: req.user.email }).exec()
  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec()

  if (cartExistByThisUser) {
    cartExistByThisUser.remove()
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {}

    object.product = cart[i].product
    object.quantity = cart[i].qty

    object.addon = cart[i].addonData
    // get price for creating total

    object.price = cart[i].price
    products.push(object)
  }
  let cartTotal = 0
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].quantity
  }
  const newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save()
  res.json(newCart)
})

// @desc    Get cart by user
// @route   GET /api/cart
// @access  Private
exports.cartList = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()

  const cart = await Cart.findOne({ orderdBy: user._id })
    .populate('products.product', '_id title price')
    .exec()

  res.json(cart)
})

// @desc    delete cart by user
// @route   DELETE /api/cart
// @access  Private
exports.clearDbCart = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec()
  res.json(cart)
})

// @desc    update discount price
// @route   POST /api/cart/coupon
// @access  Private

exports.applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body

  const validCoupon = await Coupon.findOne({ name: coupon }).exec()
  const user = await User.findOne({ email: req.user.email }).exec()
  if (validCoupon === null) {
    res.status(500)
    throw new Error('Invalid Coupon')
  } else {
    const checkAppliedCoupon = await Cart.findOne({ orderdBy: user._id })
    if (checkAppliedCoupon && checkAppliedCoupon.couponApplied) {
      res.status(500)
      throw new Error('Already Applied Coupon')
    } else {
      const { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
        .populate('products.product', '_id title price')
        .exec()

      // calculate the total after discount
      const totalAfterDiscount = (
        cartTotal -
        (cartTotal * validCoupon.discount) / 100
      ).toFixed(2) // 99.99

      const cartByUser = await Cart.findOne({ orderdBy: user._id })
      if (cartByUser) {
        cartByUser.totalAfterDiscount = totalAfterDiscount
        cartByUser.couponApplied = true
        const updateDiscountPrice = await cartByUser.save()
        res.json(updateDiscountPrice)
      } else {
        res.status(500)
        throw new Error('user cant found')
      }
    }
  }
})
