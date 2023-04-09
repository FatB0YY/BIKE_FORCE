import { Router } from 'express'
import userController from '../controllers/userController.js'
import authCheckMiddleware from '../middleware/authMiddleware.js'
import validateMiddleware from '../error/validateRequestSchema.js'
import authValidation from '../validation/authValidation.js'
import loginValidation from '../validation/loginValidation.js'

const router = Router()

router.post('/registration', authValidation, validateMiddleware, userController.registration)
router.post('/login', loginValidation, validateMiddleware, userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authCheckMiddleware, userController.getUsers)

export default router
