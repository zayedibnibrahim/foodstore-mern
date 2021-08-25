const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')
const slugify = require('slugify')

// @desc    POST create
// @route   POST /api/category
// @access  Private admin
exports.categoryCreate = asyncHandler(async (req, res) => {
  const { name } = req.body
  const categoryExist = await Category.findOne({ slug: slugify(name) })

  if (categoryExist) {
    res.status(500)
    throw new Error('Category with the same name already exist')
  } else {
    const category = await Category.create({
      name,
      slug: slugify(name),
    })
    if (category) {
      res.json(category)
    } else {
      res.status(401)
      throw new Error('Category create failed')
    }
  }
})

// @desc    Category List
// @route   GET /api/category
// @access  Public
exports.categoryList = asyncHandler(async (req, res) => {
  const category = await Category.find({}).sort({ createdAt: 1 })
  if (category) {
    res.json(category)
  } else {
    res.status(500)
    throw new Error("Category can't found")
  }
})

// @desc    Category By slug
// @route   Get /api/category/:slug
// @access  Public
exports.categoryBySlug = asyncHandler(async (req, res) => {
  const slug = req.params.slug
  const category = await Category.findOne({ slug })
  if (category) {
    res.json(category)
  } else {
    res.status(500)
    throw new Error('Category Not Found')
  }
})

// @desc    Update a Category
// @route   PUT /api/category/:slug
// @access  Private admin
exports.categoryUpdate = asyncHandler(async (req, res) => {
  const slug = req.params.slug
  const { name } = req.body
  const category = await Category.findOne({ slug })
  if (category) {
    const categoryExist = await Category.findOne({ slug: slugify(name) })
    if (categoryExist) {
      res.status(500)
      throw new Error('Category with the same name already exist')
    } else {
      category.name = name
      category.slug = slugify(name)
      const updatedCategory = await category.save()
      res.json(updatedCategory)
    }
  } else {
    res.status(500)
    throw new Error('Category Not Found')
  }
})

// @desc    DELETE a category
// @route   DELETE /api/category/:slug
// @access  Private admin
exports.categoryDelete = asyncHandler(async (req, res) => {
  const slug = req.params.slug
  const category = await Category.findOne({ slug })
  if (category) {
    await category.remove()
    res.json({
      message: 'Category Deleted',
    })
  } else {
    res.status(500)
    throw new Error('Category Not Found')
  }
})

// @desc    get products category
// @route   POST /api/categoryByCategory
// @access  Public
exports.productsByCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.body.slug })
  const products = await Product.find({ category, availability: 'Yes' })
    .sort([['title', 'ASC']])
    .populate('category')
    .populate('addon')
    .populate({
      path: 'variable',
      populate: { path: 'attribute' },
    })
  res.json({ products, category })
})
