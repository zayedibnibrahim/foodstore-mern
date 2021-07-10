const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const productSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    image: {
      type: String,
      required: true,
    },
    addon: [
      {
        type: ObjectId,
        required: true,
      },
    ],
    category: {
      type: ObjectId,
      ref: 'Category',
    },
    sold: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    service: {
      type: String,
      enum: ['Delivery', 'Pickup'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Product', productSchema)
