const asyncHandler = require('express-async-handler')
const Coupon = require('../models/couponModels')

// @desc    POST Coupon
// @route   POST /api/coupon
// @access  Private admin
exports.couponCreate = asyncHandler(async (req, res) => {
  const { name, expiry, discount } = req.body
  const createCoupon = await Coupon.create({
    name,
    expiry,
    discount,
  })
  if (createCoupon) {
    res.json(createCoupon)
  } else {
    res.status(401)
    throw new Error('Coupon create failed')
  }
})
