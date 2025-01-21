import express from 'express'
import { loginUser } from '../controllers/login_controller.js'
const router = express.Router()

router.post("/", loginUser)

export default router