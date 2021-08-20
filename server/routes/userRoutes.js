const express = require('express')
const {
  userList,
  saveShippingAddress,
} = require('../controllers/userControllers')
const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/users')
  .get(protect, adminCheck, userList)
  .put(protect, saveShippingAddress)

module.exports = router
