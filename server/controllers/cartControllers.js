const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const User = require('../models/userModel')
const Cart = require('../models/cartModels')

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

exports.cartList = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()

  const cart = await Cart.findOne({ orderdBy: user._id })
    .populate('products.product', '_id title price')
    .exec()

  res.json(cart)
})

exports.clearDbCart = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec()
  res.json(cart)
})
