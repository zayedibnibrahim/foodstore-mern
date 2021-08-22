const express = require('express')
const {
  couponCreate,
  couponList,
  couponDelete,
} = require('../controllers/couponControllers')

const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/coupon')
  .post(protect, adminCheck, couponCreate)
  .get(protect, couponList)
router.route('/coupon/:id').delete(protect, adminCheck, couponDelete)

module.exports = router
