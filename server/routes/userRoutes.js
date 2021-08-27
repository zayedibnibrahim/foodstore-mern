const express = require('express')
const {
  userList,
  saveShippingAddress,
  userDetails,
  addToWishlist,
  removeFromWishlist,
  wishlistData,
} = require('../controllers/userControllers')
const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/users')
  .get(protect, adminCheck, userList)
  .post(protect, saveShippingAddress)
router.route('/admin/usersDetails/:id').get(protect, adminCheck, userDetails)

router.route('/wishlist').get(protect, wishlistData)

router
  .route('/wishlist/:id')
  .post(protect, addToWishlist)
  .put(protect, removeFromWishlist)

module.exports = router
