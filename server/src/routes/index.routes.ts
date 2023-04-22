import { Router } from 'express'
import brandRouter from './brand.routes.js'
import productRouter from './product.routes.js'
import categoryRouter from './category.routes.js'
import userRouter from './user.routes.js'
import roleRouter from './role.routes.js'

const router = Router()

router.use('/product', productRouter)
router.use('/brand', brandRouter)
router.use('/category', categoryRouter)
router.use('/user', userRouter)
router.use('/role', roleRouter)

export default router
