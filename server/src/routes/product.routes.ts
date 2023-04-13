import { Router } from 'express'
import productController from '../controllers/productController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import { UserRoleAdmin } from '../models/IUser.js'

const router = Router()

router.post('/', checkRoleMiddleware(UserRoleAdmin.ADMIN), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.put('/:id', checkRoleMiddleware(UserRoleAdmin.ADMIN), productController.delete)

export default router
