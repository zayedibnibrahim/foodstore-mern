const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

exports.createOrUpdateUser = asyncHandler(async (req, res) => {
  const { name, picture, email } = req.user

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  )
  if (user) {
    res.json(user)
  } else {
    const newUser = await new User({
      email,
      name,
      picture,
    }).save()

    res.json(newUser)
  }
})

exports.currentUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email })
  if (user) {
    res.status(201).json(user)
  } else {
    res.status(401)
    throw new Error('User Not Found')
  }
})
