const express = require('express')
const { userList } = require('../controllers/user')
const { protect, adminCheck } = require('../middleware/auth')

const router = express.Router()

router.route('/users').get(protect, adminCheck, userList)

module.exports = router
