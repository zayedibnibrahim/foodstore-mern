const asyncHandler = require('express-async-handler')
const Variable = require('../models/variableModel')

// @desc    POST create
// @route   POST /api/variable
// @access  Private admin
exports.variableCreate = asyncHandler(async (req, res) => {
  const { name, attribute } = req.body

  const variable = await Variable.create({
    name,
    attribute,
  })
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

// @desc    DELETE a variable
// @route   DELETE /api/variable/:id
// @access  Private admin
exports.variableDelete = asyncHandler(async (req, res) => {
  const variableId = req.params.id
  const variable = await Variable.findById(variableId)
  if (variable) {
    await Variable.deleteOne({ _id: variableId })
    res.json({
      message: 'Variable Deleted',
    })
  } else {
    res.status(500)
    throw new Error('Variable Not Found')
  }
})

// @desc    variable By id
// @route   Get /api/variable/:id
// @access  Public
exports.variableById = asyncHandler(async (req, res) => {
  const variableId = req.params.id
  const variable = await Variable.findById(variableId).populate('attribute')
  if (variable) {
    res.json(variable)
  } else {
    res.status(500)
    throw new Error('Variable Not Found')
  }
})

// @desc    Update a variable
// @route   PUT /api/variable/:id
// @access  Private admin
exports.variableUpdate = asyncHandler(async (req, res) => {
  const variableId = req.params.id
  const { name, attribute } = req.body
  const variable = await Variable.findById(variableId)
  if (variable) {
    variable.name = name
    variable.attribute = attribute
    const updatedVariable = await variable.save()
    res.json(updatedVariable)
  } else {
    res.status(500)
    throw new Error('Variable Not Found')
  }
})
