const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

exports.userList = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.json(users)
  }
})
