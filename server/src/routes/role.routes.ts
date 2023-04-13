import { Router } from 'express'
import roleController from '../controllers/roleController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import { UserRoleAdmin } from '../models/IUser.js'
import roleValidation from '../validation/roleValidation.js'
import validateMiddleware from '../error/validateRequestSchema.js'

const router = Router()

router.post('/', roleValidation, validateMiddleware, checkRoleMiddleware(UserRoleAdmin.ADMIN), roleController.create)
router.get('/', roleController.getAll)
router.get('/getOne', roleController.getRoleByName)
router.post('/addRole', checkRoleMiddleware(UserRoleAdmin.ADMIN), roleController.addRole)

export default router
