const express = require('express')
const {
  productCreate,
  uploadImage,
  removeImage,
} = require('../controllers/productControllers')

const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/upload').post(protect, adminCheck, uploadImage)
router.route('/remove').post(protect, adminCheck, removeImage)
router.route('/product').post(protect, adminCheck, productCreate)
// router
//   .route('/product/:slug')
//   .get(categoryById)
//   .put(protect, adminCheck, categoryUpdate)
//   .delete(protect, adminCheck, categoryDelete)

module.exports = router
