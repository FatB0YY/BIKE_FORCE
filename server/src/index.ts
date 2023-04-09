import * as dotenv from 'dotenv'
dotenv.config()

import express, { Express, json } from 'express'
import * as model from './models/models.js'
import cookieParser from 'cookie-parser'
import router from './routes/index.routes.js'
import apiErrorHandler from './error/apiErrorHandler.js'
import path from 'path'
import cors from 'cors'
import logger from './logger/index.js'
import fileDirName from './utils/fileDirName.js'
import formData from 'express-form-data'
import sequelize from './db.js'

const { __dirname, __filename } = fileDirName(import.meta)
const app: Express = express()

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || '*',
  }),
)
app.use(json())
app.use(formData.parse())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)
app.use(apiErrorHandler)

const PORT = process.env.PORT

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`)
    })
  } catch (error: unknown) {
    logger.error(error)
    process.exit(1)
  }
}
start()
