const asyncHandler = require('express-async-handler')
const Attribute = require('../models/attributeModel')

// @desc    POST create
// @route   POST /api/attribute
// @access  Private admin
exports.attributeCreate = asyncHandler(async (req, res) => {
  const { name, price, product } = req.body
  const attribute = await Attribute.create({
    name,
    price,
    product,
  })
  if (attribute) {
    res.json(attribute)
  } else {
    res.status(401)
    throw new Error('Attribute create failed')
  }
})

// @desc    Attribute List
// @route   GET /api/attribute
// @access  Public
exports.attributeList = asyncHandler(async (req, res) => {
  const attribute = await Attribute.find({}).sort({ createdAt: 1 })
  if (attribute) {
    res.json(attribute)
  } else {
    res.status(500)
    throw new Error("Attribute can't found")
  }
})

// @desc    Attribute By id
// @route   Get /api/attribute/:id
// @access  Public
exports.attributeById = asyncHandler(async (req, res) => {
  const id = req.params.id
  const attribute = await Attribute.findById(id)
  if (attribute) {
    res.json(attribute)
  } else {
    res.status(500)
    throw new Error('Attribute Not Found')
  }
})

// @desc    Update a Attribute
// @route   PUT /api/attribute/:id
// @access  Private admin
exports.attributeUpdate = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { name, price, product } = req.body
  const attribute = await Attribute.findById(id)
  if (attribute) {
    attribute.name = name
    attribute.price = price
    attribute.product = product
    const updatedAttribute = await attribute.save()
    res.json(updatedAttribute)
  } else {
    res.status(500)
    throw new Error('Attribute Not Found')
  }
})

// @desc    DELETE a attribute
// @route   DELETE /api/attribute/:id
// @access  Private admin
exports.attributeDelete = asyncHandler(async (req, res) => {
  const id = req.params.id
  const attribute = await Attribute.findById(id)
  if (attribute) {
    await attribute.remove()
    res.json({
      message: 'Attribute Deleted',
    })
  } else {
    res.status(500)
    throw new Error('Attribute Not Found')
  }
})
