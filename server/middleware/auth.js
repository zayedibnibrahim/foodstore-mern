const admin = require('../firebase')

exports.protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const firebaseUser = await admin.auth().verifyIdToken(token)
      req.user = firebaseUser
      next()
    } catch (error) {
      res.status(401)
      console.log('error', error)
      throw new Error('Not authorized, token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
}
