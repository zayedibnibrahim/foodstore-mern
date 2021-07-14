const mongoose = require('mongoose')
const AddonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Too Short'],
      maxlength: [32, 'Too Long'],
      trim: true,
      require: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    price: {
      type: Number,
      trim: true,
      require: true,
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Addon', AddonSchema)
