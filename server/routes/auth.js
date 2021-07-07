import express from 'express'
import { createOrUpdateUser, currentUser } from '../controllers/auth.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/create-or-update-user').post(protect, createOrUpdateUser)
router.route('/current-user').post(protect, currentUser)

export default router
