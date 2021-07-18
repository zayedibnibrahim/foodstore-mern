const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const variableSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      require: true,
    },
    meta: {
      type: String,
      require: true,
    },
    variable: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Variable', variableSchema)
