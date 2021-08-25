const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Cart = require('../models/cartModels')
const Order = require('../models/orderModels')
const Product = require('../models/productModel')

// @desc    POST Order
// @route   POST /api/order
// @access  Private

exports.orderCreate = asyncHandler(async (req, res) => {
  const paymentIntent = req.body.stripeRes

  const user = await User.findOne({ email: req.user.email }).exec()

  if (user) {
    const { products, cartTotal, totalAfterDiscount, couponApplied } =
      await Cart.findOne({ orderdBy: user._id }).exec()

    const newOrder = await new Order({
      products,
      cartTotal,
      totalAfterDiscount,
      couponApplied,
      paymentIntent,
      orderdBy: user._id,
    }).save()

    if (newOrder) {
      res.json(newOrder)
      // increment sold
      const bulkOption = products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product }, // IMPORTANT item.product
            update: { $inc: { sold: +item.quantity } },
          },
        }
      })

      await Product.bulkWrite(bulkOption, {})
    } else {
      res.status(500)
      throw new Error("Can't create Order")
    }
  } else {
    res.status(500)
    throw new Error('User Not Found')
  }
})

// @desc    GET Order details By Id / single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('orderdBy', 'name email shipping role')
    .populate('products.product', '_id title price image slug addon')
    .exec()
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
})
