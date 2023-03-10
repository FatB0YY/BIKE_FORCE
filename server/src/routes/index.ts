import { Router } from 'express'
import brandRouter from './brandRouter'
import deviceRouter from './deviceRouter'
import typeRouter from './typeRouter'
import userRouter from './userRouter'

const router = Router()

router.use('/device', deviceRouter)
router.use('/brand', brandRouter)
router.use('/type', typeRouter)
router.use('/user', userRouter)

export default router
