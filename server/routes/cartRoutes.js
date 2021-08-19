const express = require('express')
const { dbCart, cartList } = require('../controllers/cartControllers')

const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/cart').post(protect, dbCart).get(protect, cartList)

module.exports = router
