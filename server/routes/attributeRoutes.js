const express = require('express')
const {
  attributeCreate,
  attributeList,
  attributeById,
  attributeUpdate,
  attributeDelete,
} = require('../controllers/attributeControllers')
const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/attribute')
  .post(protect, adminCheck, attributeCreate)
  .get(attributeList)
router
  .route('/attribute/:id')
  .get(attributeById)
  .put(protect, adminCheck, attributeUpdate)
  .delete(protect, adminCheck, attributeDelete)

module.exports = router
