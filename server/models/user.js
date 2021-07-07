import mongoose from 'mongoose'
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
    address: String,
    // wishlist: [{ type: ObjectId, ref: 'Product' }],
  },
  {
    timestamps: true,
  }
)
const User = mongoose.model('User', userSchema)
export default User
