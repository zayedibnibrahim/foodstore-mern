const express = require('express')
const {
  productCreate,
  uploadImage,
  removeImage,
  getProducts,
  deleteProducts,
  getProductDetails,
  updateProduct,
  countProducts,
  getProductsAdmin,
} = require('../controllers/productControllers')

const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/upload').post(protect, adminCheck, uploadImage)
router.route('/remove').post(protect, adminCheck, removeImage)

router
  .route('/product')
  .post(protect, adminCheck, productCreate)
  .get(getProducts)
router.route('/product/:id').delete(protect, adminCheck, deleteProducts)
router
  .route('/product/:slug')
  .get(getProductDetails)
  .put(protect, adminCheck, updateProduct)

//Admin Product List with pagination
router.route('/productCount').get(countProducts)
router.route('/productListAdmin').post(getProductsAdmin)

module.exports = router
