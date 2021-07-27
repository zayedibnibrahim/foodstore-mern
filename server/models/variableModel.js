const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const variableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    attribute: [
      {
        type: ObjectId,
        ref: 'Attribute',
      },
    ],
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Variable', variableSchema)
