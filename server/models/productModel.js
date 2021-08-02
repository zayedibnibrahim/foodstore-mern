const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const productSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
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
      type: Object,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    addon: [
      {
        type: ObjectId,
        ref: 'Addon',
      },
    ],
    sold: {
      type: Number,
      default: 0,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    delivery: {
      type: String,
      enum: ['Yes', 'No'],
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      trim: true,
    },
    variable: {
      type: ObjectId,
      ref: 'Variable',
      default: null,
    },
    availability: {
      type: String,
      enum: ['Yes', 'No'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Product', productSchema)
