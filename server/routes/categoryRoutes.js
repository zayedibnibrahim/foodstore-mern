const express = require('express')
const {
  categoryCreate,
  categoryList,
  categoryBySlug,
  categoryUpdate,
  categoryDelete,
} = require('../controllers/categoryControllers')
const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/category')
  .post(protect, adminCheck, categoryCreate)
  .get(categoryList)
router
  .route('/category/:slug')
  .get(categoryBySlug)
  .put(protect, adminCheck, categoryUpdate)
  .delete(protect, adminCheck, categoryDelete)

module.exports = router
