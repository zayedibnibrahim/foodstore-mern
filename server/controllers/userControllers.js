const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

exports.userList = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.json(users)
  }
})

exports.saveShippingAddress = asyncHandler(async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { shipping: req.body.shipping }
  ).exec()
  if (userAddress) {
    res.json(userAddress)
  }
})
