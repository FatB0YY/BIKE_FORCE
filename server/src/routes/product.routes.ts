import { Router } from 'express'
import productController from '../controllers/productController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import { UserRoles } from '../models/IUser.js'

const router = Router()

router.post('/', checkRoleMiddleware(UserRoles.ADMIN), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)

export default router
