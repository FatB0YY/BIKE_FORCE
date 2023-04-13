import { Router } from 'express'
import userController from '../controllers/userController.js'
import validateMiddleware from '../error/validateRequestSchema.js'
import authValidation from '../validation/authValidation.js'
import loginValidation from '../validation/loginValidation.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import { UserRoleAdmin } from '../models/IUser.js'

const router = Router()

router.post('/registration', authValidation, validateMiddleware, userController.registration)
router.post('/login', loginValidation, validateMiddleware, userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', checkRoleMiddleware(UserRoleAdmin.ADMIN), userController.getUsers)
router.post('/ban', checkRoleMiddleware(UserRoleAdmin.ADMIN), userController.ban)

export default router
