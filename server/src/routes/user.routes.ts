import { Router } from 'express'
import userController from '../controllers/userController'
import authCheckMiddleware from '../middleware/authMiddleware'
import validateMiddleware from '../middleware/validateMiddleware'
import authValidation from '../validation/authValidation'

const router = Router()

router.post(
  '/registration',
  authValidation,
  validateMiddleware,
  userController.registration
)
router.post('/login', authValidation, validateMiddleware, userController.login)
router.get(
  '/auth',
  authCheckMiddleware,
  authValidation,
  validateMiddleware,
  userController.refresh
)

export default router
