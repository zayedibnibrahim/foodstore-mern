const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Order = require('../models/orderModels')

// @desc    get Products Admin
// @route   GET /api/productListAdmin
// @access  Public
exports.userList = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.json(users)
  }
})

// @desc    update and add user shipping address
// @route   POST /api/user
// @access  private
exports.saveShippingAddress = asyncHandler(async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { shipping: req.body.shipping }
  ).exec()
  if (userAddress) {
    res.json(userAddress)
  }
})

// @desc    Get user details
// @route   GET /api/admin/userDetails/:id
// @access  private Admin
exports.userDetails = asyncHandler(async (req, res) => {
  const userId = req.params.id
  const user = await User.findById(userId).exec()
  const orderList = await Order.find({ orderdBy: userId })
    .sort('-createdAt')
    .exec()

  if (orderList && user) {
    res.json({ user, orderList })
  } else {
    res.status(404)
    throw new Error('User And Order Not Found')
  }
})
