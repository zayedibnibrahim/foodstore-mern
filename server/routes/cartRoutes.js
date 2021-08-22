const express = require('express')
const {
  dbCart,
  cartList,
  clearDbCart,
  applyCoupon,
} = require('../controllers/cartControllers')

const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/cart')
  .post(protect, dbCart)
  .get(protect, cartList)
  .delete(protect, clearDbCart)
router.route('/cart/coupon').post(protect, applyCoupon)
module.exports = router
