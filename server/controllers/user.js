import asyncHandler from 'express-async-handler'
import User from '../models/user.js'

const userList = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.json(users)
  }
})

export { userList }
