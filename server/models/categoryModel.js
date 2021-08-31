const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Too Short'],
      maxlength: [32, 'Too Long'],
      trim: true,
      require: true,
    },
    image: {
      type: Object,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Category', CategorySchema)
