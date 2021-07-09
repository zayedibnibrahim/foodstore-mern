const asyncHandler = require('express-async-handler')
const admin = require('../firebase')
const User = require('../models/userModel')

exports.protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      req.user = await admin.auth().verifyIdToken(token)
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }
})

exports.adminCheck = asyncHandler(async (req, res, next) => {
  const { email } = req.user
  const adminEmail = await User.findOne({ email })
  if (adminEmail.role !== 'admin') {
    res.status(401)
    throw new Error('Not authorized as an admin')
  } else {
    next()
  }
})
