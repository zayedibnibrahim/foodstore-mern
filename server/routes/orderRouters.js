const express = require('express')
const { orderCreate, getOrderById } = require('../controllers/orderControllers')
const { protect, adminCheck } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/order').post(protect, orderCreate)
router.route('/order/:id').get(protect, getOrderById)
module.exports = router
