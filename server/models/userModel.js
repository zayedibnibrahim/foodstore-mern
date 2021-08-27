const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      index: true,
    },
    role: {
      type: String,
      default: 'customer',
    },
    cart: {
      type: Array,
      default: [],
    },
    shipping: {
      address: String,
      city: String,
      country: String,
      postcode: String,
    },
    wishlist: [{ type: ObjectId, ref: 'Product' }],
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('User', userSchema)
