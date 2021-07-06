const express = require('express')
const { createOrUpdateUser, currentUser } = require('../controllers/auth')
const { protect } = require('../middleware/auth')

const router = express.Router()

router.route('/create-or-update-user').post(protect, createOrUpdateUser)
router.route('/current-user').post(protect, currentUser)

module.exports = router
