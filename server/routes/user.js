import express from 'express'
import { userList } from '../controllers/user.js'
import { protect, adminCheck } from '../middleware/auth.js'

const router = express.Router()

router.route('/').get(protect, adminCheck, userList)

export default router
