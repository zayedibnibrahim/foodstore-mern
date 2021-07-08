const asyncHandler = require('express-async-handler')
const user = require('../models/user')
const User = require('../models/user')

exports.userList = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.json(users)
  }
})
