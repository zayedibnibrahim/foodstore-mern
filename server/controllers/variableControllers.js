const asyncHandler = require('express-async-handler')
const Variable = require('../models/variableModel')

// @desc    POST create
// @route   POST /api/variable
// @access  Private admin
exports.variableCreate = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, attribute } = req.body

  const variable = await Variable.create({
    name,
    attribute,
  })
  // console.log(variable)
  if (variable) {
    res.json(variable)
  } else {
    res.status(401)
    throw new Error('Variable create failed')
  }
})

// @desc    get List
// @route   GET /api/variable
// @access  Public
exports.variableList = asyncHandler(async (req, res) => {
  const variable = await Variable.find({})
    .populate('attribute')
    .sort({ createdAt: 1 })
  if (variable) {
    res.json(variable)
  } else {
    res.status(500)
    throw new Error("Variable can't found")
  }
})
