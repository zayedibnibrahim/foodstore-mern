const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Order = require('../models/orderModels')

// @desc    get Products Admin
// @route   GET /api/productListAdmin
// @access  Public
exports.userList = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.json(users)
  }
})

// @desc    update and add user shipping address
// @route   POST /api/user
// @access  private
exports.saveShippingAddress = asyncHandler(async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { shipping: req.body.shipping }
  ).exec()
  if (userAddress) {
    res.json(userAddress)
  }
})

// @desc    Get user details
// @route   GET /api/admin/userDetails/:id
// @access  private Admin
exports.userDetails = asyncHandler(async (req, res) => {
  const userId = req.params.id
  const user = await User.findById(userId).exec()
  const orderList = await Order.find({ orderdBy: userId })
    .sort('-createdAt')
    .exec()

  if (orderList && user) {
    res.json({ user, orderList })
  } else {
    res.status(404)
    throw new Error('User And Order Not Found')
  }
})

// @desc    Add to wishlist
// @route   POST /api/wishlist/:id
// @access  private
exports.addToWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.id

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec()

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('product failed to add in wishlist')
  }
})

// @desc    Remove From wishlist
// @route   PUT /api/wishlist/:id
// @access  private
exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.id

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec()

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('product failed to Remove from wishlist')
  }
})

// @desc    User WishList Data
// @route   GET /api/wishlist
// @access  private
exports.wishlistData = asyncHandler(async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select('wishlist')
    .populate({
      path: 'wishlist',
      select: '_id slug title category variable price image.url availability',
      populate: { path: 'variable', populate: { path: 'attribute' } },
    })
    .populate({
      path: 'wishlist',
      select: '_id slug title category variable price image.url availability',
      populate: { path: 'category' },
    })
    .exec()

  if (list) {
    res.json(list)
  } else {
    res.status(404)
    throw new Error('Failed to get wishlist')
  }
})
