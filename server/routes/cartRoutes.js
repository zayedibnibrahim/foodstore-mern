const express = require('express')
const {
  dbCart,
  cartList,
  clearDbCart,
} = require('../controllers/cartControllers')

const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/cart')
  .post(protect, dbCart)
  .get(protect, cartList)
  .delete(protect, clearDbCart)

module.exports = router
