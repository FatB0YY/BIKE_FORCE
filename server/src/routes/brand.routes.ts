import { Router } from 'express'
import brandController from '../controllers/brandController'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'
import { UserRoles } from '../models/IUser'

const router = Router()

router.post('/', checkRoleMiddleware(UserRoles.ADMIN), brandController.create)
router.get('/', brandController.getAll)

export default router
