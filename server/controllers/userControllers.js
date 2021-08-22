const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

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
