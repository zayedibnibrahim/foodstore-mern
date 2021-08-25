const express = require('express')
const {
  orderCreate,
  getOrderById,
  userOrderList,
  adminOrderList,
} = require('../controllers/orderControllers')
const { protect, adminCheck } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/order').post(protect, orderCreate).get(protect, userOrderList)
router.route('/order/:id').get(protect, getOrderById)
router.route('/admin/orderlist').get(protect, adminCheck, adminOrderList)

module.exports = router
