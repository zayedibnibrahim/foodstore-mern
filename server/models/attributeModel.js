const mongoose = require('mongoose')
const AttributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [1, 'Too Short'],
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
      type: String,
      trim: true,
      require: true,
      default: 'UnNamed',
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Attribute', AttributeSchema)
