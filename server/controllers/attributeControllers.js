const asyncHandler = require('express-async-handler')
const Attribute = require('../models/attributeModel')
const slugify = require('slugify')

// @desc    POST create
// @route   POST /api/attribute
// @access  Private admin
exports.attributeCreate = asyncHandler(async (req, res) => {
  const { name, price } = req.body
  const attributeExist = await Attribute.findOne({ slug: slugify(name) })

  if (attributeExist) {
    res.status(500)
    throw new Error('Attribute with the same name already exist')
  } else {
    const attribute = await Attribute.create({
      name,
      slug: slugify(name),
      price,
    })
    if (attribute) {
      res.json(attribute)
    } else {
      res.status(401)
      throw new Error('Attribute create failed')
    }
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

// @desc    Attribute By slug
// @route   Get /api/attribute/:slug
// @access  Public
exports.attributeBySlug = asyncHandler(async (req, res) => {
  const slug = req.params.slug
  const attribute = await Attribute.findOne({ slug })
  if (attribute) {
    res.json(attribute)
  } else {
    res.status(500)
    throw new Error('Attribute Not Found')
  }
})

// @desc    Update a Attribute
// @route   PUT /api/attribute/:slug
// @access  Private admin
exports.attributeUpdate = asyncHandler(async (req, res) => {
  const slug = req.params.slug
  const { name, price } = req.body
  const attribute = await Attribute.findOne({ slug })
  if (attribute) {
    const attributeExist = await Attribute.findOne({ slug: slugify(name) })
    if (attributeExist) {
      res.status(500)
      throw new Error('Attribute with the same name already exist')
    } else {
      attribute.name = name
      attribute.slug = slugify(name)
      attribute.price = price
      const updatedAttribute = await attribute.save()
      res.json(updatedAttribute)
    }
  } else {
    res.status(500)
    throw new Error('Attribute Not Found')
  }
})

// @desc    DELETE a attribute
// @route   DELETE /api/attribute/:slug
// @access  Private admin
exports.attributeDelete = asyncHandler(async (req, res) => {
  const slug = req.params.slug
  const attribute = await Attribute.findOne({ slug })
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
