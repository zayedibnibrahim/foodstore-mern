const express = require('express')
const {
  dbCart,
  cartList,
  clearDbCart,
  applyCoupon,
  cancelCoupon,
  deleteUserDbCart,
} = require('../controllers/cartControllers')

const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/cart')
  .post(protect, dbCart)
  .get(protect, cartList)
  .delete(protect, clearDbCart)
router.route('/cart/coupon').post(protect, applyCoupon)
router.route('/cart/coupon-cancel').post(protect, cancelCoupon)
router.route('/cart/delete-user-cart').delete(protect, deleteUserDbCart)

module.exports = router
