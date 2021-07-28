const express = require('express')
const {
  variableCreate,
  variableList,
  variableDelete,
  variableById,
  variableUpdate,
} = require('../controllers/variableControllers')

const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/variable')
  .post(protect, adminCheck, variableCreate)
  .get(variableList)
router
  .route('/variable/:id')
  .delete(protect, adminCheck, variableDelete)
  .get(variableById)
  .put(protect, adminCheck, variableUpdate)

module.exports = router
