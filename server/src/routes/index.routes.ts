import { Router } from 'express'
import brandRouter from './brand.routes'
import deviceRouter from './device.routes'
import typeRouter from './type.routes'
import userRouter from './user.routes'

const router = Router()

router.use('/device', deviceRouter)
router.use('/brand', brandRouter)
router.use('/type', typeRouter)
router.use('/user', userRouter)

export default router
