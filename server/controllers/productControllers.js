const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const slugify = require('slugify')
const cloudinary = require('../config/cloudinary')

// @desc    POST Image to Cloudinary
// @route   POST /api/upload
// @access  Private admin
exports.uploadImage = asyncHandler(async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    upload_preset: 'foodstore',
    use_filename: true,
    public_id: `${Date.now()}`,
    resource_type: 'auto', // jpeg, png
  })
  if (result) {
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }
})

// @desc    POST Remove Image from Cloudinary
// @route   POST /api/remove
// @access  Private admin
exports.removeImage = asyncHandler(async (req, res) => {
  const remove = await cloudinary.v2.uploader.destroy(req.body.id)
  if (remove.result === 'ok') {
    res.json(remove)
  } else {
    res.status(500)
    throw new Error('Image Not Found')
  }
})

// @desc    create product
// @route   POST /api/product
// @access  Private admin
exports.productCreate = asyncHandler(async (req, res) => {
  const {
    title,
    price,
    image,
    category,
    addon,
    sold,
    description,
    delivery,
    availability,
  } = req.body
  const productExist = await Product.findOne({ slug: slugify(title) })

  if (productExist) {
    res.status(500)
    throw new Error('Product with the same name already exist')
  } else {
    const product = await Product.create({
      user: req.user.name,
      title,
      slug: slugify(title),
      price,
      image,
      category,
      addon,
      sold,
      description,
      delivery,
      availability,
    })
    if (product) {
      res.json(product)
    } else {
      res.status(401)
      throw new Error('Product create failed')
    }
  }
})

// @desc    get Products
// @route   GET /api/product
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .populate('category', 'name')
    .populate('addon', 'name price')
  res.json(products)
})

// @desc    delete Products
// @route   DELETE /api/product/id
// @access  Private admin
exports.deleteProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({
      message: 'Product Deleted',
    })
  } else {
    res.status(500)
    throw new Error('Product Not Found')
  }
})
