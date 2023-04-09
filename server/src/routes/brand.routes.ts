import { Router } from 'express'
import brandController from '../controllers/brandController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import { UserRoles } from '../models/IUser.js'

const router = Router()

router.post('/', checkRoleMiddleware(UserRoles.ADMIN), brandController.create)
router.get('/', brandController.getAll)

export default router
