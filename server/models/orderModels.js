const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        price: Number,
        quantity: Number,
        variableData: Object,
        addon: [
          {
            type: Object,
          },
        ],
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    couponApplied: {
      type: Boolean,
      default: false,
    },
    paymentIntent: {
      id: String,
      amount: Number,
      status: {
        type: String,
        enum: ['pending', 'succeeded'],
      },
    },
    paymentMethod: String,
    orderStatus: {
      type: String,
      default: 'Not Processed',
      enum: [
        'Not Processed',
        'Processing',
        'Dispatched',
        'Cancelled',
        'Completed',
      ],
    },
    orderdBy: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema)
