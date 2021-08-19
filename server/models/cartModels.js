const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        price: Number,
        quantity: Number,
        addon: [
          {
            type: Object,
          },
        ],
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderdBy: { type: ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Cart', CartSchema)
