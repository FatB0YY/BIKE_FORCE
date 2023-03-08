import { Router } from 'express'
import UserController from '../controllers/userController'
const router = Router()
const userController: UserController = require('../controllers/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/refresh', userController.refresh)

module.exports = router
