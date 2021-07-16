const express = require('express')
const {
  addonCreate,
  addonList,
  addonBySlug,
  addonUpdate,
  addonDelete,
} = require('../controllers/addonControllers')
const { protect, adminCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/addon').post(protect, adminCheck, addonCreate).get(addonList)
router
  .route('/addon/:slug')
  .get(addonBySlug)
  .put(protect, adminCheck, addonUpdate)
  .delete(protect, adminCheck, addonDelete)

module.exports = router
