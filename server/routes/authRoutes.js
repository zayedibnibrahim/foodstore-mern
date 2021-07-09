const express = require('express')
const {
  createOrUpdateUser,
  currentUser,
} = require('../controllers/authControllers')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/auth/create-or-update-user').post(protect, createOrUpdateUser)
router.route('/auth/current-user').post(protect, currentUser)

module.exports = router
