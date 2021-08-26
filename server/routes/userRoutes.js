const express = require('express')
const {
  userList,
  saveShippingAddress,
  userDetails,
} = require('../controllers/userControllers')
const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/users')
  .get(protect, adminCheck, userList)
  .post(protect, saveShippingAddress)
router.route('/admin/usersDetails/:id').get(protect, adminCheck, userDetails)

module.exports = router
