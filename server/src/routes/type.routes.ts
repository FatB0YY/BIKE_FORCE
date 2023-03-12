import { Router } from 'express'
import typeController from '../controllers/typeController'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'
import { UserRoles } from '../models/IUser'

const router = Router()

router.post('/', checkRoleMiddleware(UserRoles.ADMIN), typeController.create)
router.get('/', typeController.getAll)

export default router
