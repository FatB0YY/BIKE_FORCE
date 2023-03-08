import { Router } from 'express'

const router = Router()

const deviceRouter = require('./deviceRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')

router.use('/device', deviceRouter)
router.use('/brand', brandRouter)
router.use('/type', typeRouter)
router.use('/user', userRouter)

module.exports = router
