import { Router } from 'express'
import brandController from '../controllers/brandController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import { UserRoleAdmin } from '../models/IUser.js'

const router = Router()

router.post('/', checkRoleMiddleware(UserRoleAdmin.ADMIN), brandController.create)
router.get('/', brandController.getAll)
router.put('/:id', checkRoleMiddleware(UserRoleAdmin.ADMIN), brandController.delete)

export default router
