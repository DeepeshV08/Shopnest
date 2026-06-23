import express from 'express'
import {protect} from '../middleware/authMiddleware.js'
import { admin } from '../middleware/adminMiddleware.js'
import { getUserController, loginController, logoutController, registerController } from '../controller/authController.js'
const authRouter = express.Router()

authRouter.post('/register', registerController)

authRouter.post('/login', loginController)

authRouter.get('/user', protect , admin, getUserController)

authRouter.post('/logout', logoutController)

export default authRouter