const express = require('express')
const {
  productCreate,
  uploadImage,
  removeImage,
  getProducts,
  deleteProducts,
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

module.exports = router
