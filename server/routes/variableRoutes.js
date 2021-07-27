const express = require('express')
const {
  variableCreate,
  variableList,
} = require('../controllers/variableControllers')

const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/variable')
  .post(protect, adminCheck, variableCreate)
  .get(variableList)
// router
//   .route('/variable/:id')
//   .get(variableById)
//   .put(protect, adminCheck, variableUpdate)
//   .delete(protect, adminCheck, variableDelete)

module.exports = router
