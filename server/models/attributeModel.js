const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const AttributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Too Short'],
      maxlength: [32, 'Too Long'],
      trim: true,
      require: true,
    },
    price: {
      type: Number,
      trim: true,
      require: true,
    },
    product: {
      type: ObjectId,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Attribute', AttributeSchema)
