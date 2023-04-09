import { Router } from 'express'
import categoryController from '../controllers/categoryController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import { UserRoles } from '../models/IUser.js'

const router = Router()

router.post('/', checkRoleMiddleware(UserRoles.ADMIN), categoryController.create)
router.get('/', categoryController.getAll)

export default router
