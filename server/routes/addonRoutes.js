const express = require('express')
const {
  addonCreate,
  addonList,
  addonById,
  addonUpdate,
  addonDelete,
} = require('../controllers/addonControllers')
const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/addon').post(protect, adminCheck, addonCreate).get(addonList)
router
  .route('/addon/:slug')
  .get(addonById)
  .put(protect, adminCheck, addonUpdate)
  .delete(protect, adminCheck, addonDelete)

module.exports = router
