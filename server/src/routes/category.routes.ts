import { Router } from 'express'
import categoryController from '../controllers/categoryController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import { UserRoleAdmin } from '../models/IUser.js'

const router = Router()

router.post('/', checkRoleMiddleware(UserRoleAdmin.ADMIN), categoryController.create)
router.get('/', categoryController.getAll)
router.put('/:id', checkRoleMiddleware(UserRoleAdmin.ADMIN), categoryController.delete)

export default router
