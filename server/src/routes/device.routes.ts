import { Router } from 'express'
import deviceController from '../controllers/deviceController'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'
import { UserRoles } from '../models/IUser'

const router = Router()

router.post('/', checkRoleMiddleware(UserRoles.ADMIN), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

export default router
