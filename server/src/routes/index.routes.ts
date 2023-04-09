import { Router } from 'express'
import brandRouter from './brand.routes.js'
import productRouter from './product.routes.js'
import categoryRouter from './category.routes.js'
import userRouter from './user.routes.js'

const router = Router()

router.use('/product', productRouter)
router.use('/brand', brandRouter)
router.use('/category', categoryRouter)
router.use('/user', userRouter)

export default router
