import admin from '../firebase/index.js'
import User from '../models/user.js'

const protect = async (req, res, next) => {
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
}

const adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user
    const adminEmail = await User.findOne({ email })
    if (adminEmail.role === 'admin') {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, adminCheck }
