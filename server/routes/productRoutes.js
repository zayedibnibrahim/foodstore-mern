const express = require('express')
const {
  productCreate,
  uploadImage,
  removeImage,
  getProducts,
} = require('../controllers/productControllers')

const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/upload').post(protect, adminCheck, uploadImage)
router.route('/remove').post(protect, adminCheck, removeImage)

router
  .route('/product')
  .post(protect, adminCheck, productCreate)
  .get(getProducts)

module.exports = router
