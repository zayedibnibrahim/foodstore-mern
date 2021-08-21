const express = require('express')
const { couponCreate } = require('../controllers/couponControllers')
const { protect, adminCheck } = require('../middleware/authMiddleware')
const router = express.Router()
router.route('/coupon').post(protect, adminCheck, couponCreate)

module.exports = router
